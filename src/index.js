import { html } from 'htm/preact'
import { render } from 'preact'
var Loop = require('./loop')
var Router = require('./router')

// @TODO
// use localStorage to save profile
var profile = null

var { bus, state, loop, setRoute } = Loop()
var router = Router()

state(function onChange (newState) {
    if (!profile && newState.routePath !== '/') {
        setRoute('/')
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

    render(html`<${loop} state=${newState}>
        <${routeView} ...${params} profile=${profile} />
    <//>`, document.getElementById('content'))
})
