import { html } from 'htm/preact'
import { render } from 'preact'
var Loop = require('./loop')
var Router = require('./router')
var Profile = require('./profile')

const STORAGE_KEY = 'planetary-profile'

// @TODO
// use localStorage to save profile
var profile = Profile(STORAGE_KEY)

var { bus, state, loop, setRoute } = Loop({ profile: profile.get() })
var router = Router()

// this gets called when the page loads for initial render,
// b/c the route listener fires when you first load the page, thus
// setting the state right away
state(function onChange (newState) {
    var { routePath } = newState
    if (!newState.profile && routePath !== '/' && routePath !== '/create') {
        return setRoute('/')
    }

    var match = router.match(newState.routePath)
    if (!match) {
        console.log('not match')
        // @TODO -- should show 404
        return null
    }

    var { params } = match
    var route = match.action(match)
    var routeView = route ? route.view : null

    // re-render the app whenever the state change
    render(html`<${loop} state=${newState}>
        <${routeView} ...${params} ...${newState} />
    <//>`, document.getElementById('content'))
})
