import { html } from 'htm/preact'
import { render } from 'preact'
var Loop = require('./loop')
var Router = require('./router')
var Profile = require('./profile')
var { PROFILE_STORAGE_KEY } = require('./CONSTANTS')

var profile = Profile(PROFILE_STORAGE_KEY)

var { bus, state, loop, setRoute } = Loop({ profile: profile.get() })
var emit = bus.emit.bind(bus)

var router = Router()

// this gets called when the page loads for initial render,
// b/c the route listener fires when you first load the page, thus
// setting the state right away
state(function onChange (newState) {
    var { routePath } = newState
    var redirect = (!newState.profile &&
        (routePath !== '/' && routePath !== '/profile'))

    if (redirect) {
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
        <${routeView} ...${params} ...${newState} emit=${emit} />
    <//>`, document.getElementById('content'))
})
