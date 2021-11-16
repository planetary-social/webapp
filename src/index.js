import { html } from 'htm/preact'
import { render } from 'preact'
var Loop = require('./loop')
var { AnonymousView } = require('./view/home')

// @TODO
// use localStorage to save profile

var { bus, state, loop, setRoute } = Loop()

state(function onChange (newState) {
    render(html`<${loop} state=${newState}>
        <${AnonymousView} />
    <//>`, document.getElementById('content'))
})
