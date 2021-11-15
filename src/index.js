import { html } from 'htm/preact'
// import { useState } from 'preact/hooks';
import { render } from 'preact'
var Loop = require('./loop')
// var evs = require('./EVENTS')
// var route = require('route-event')()

var { bus, state, loop } = Loop()

state(function onChange (newState) {
    render(html`<${loop} state=${newState}>
        <p>in the loop</p>
    <//>`, document.getElementById('content'))
})

function JoinToday () {
    return html`<div class="join-today">
        <h1>Join Planetary today!</h1>
        <p>
            Planetary is a decentralized network for people who want to
            come together and connect even when the internet goes out.

        </p>
        <p>It's an app that doesn't keep your data in the cloud.</p>
    </div>`
}

function Hotness () {
    return html`<div class="hotness">
        <p>What's hot on planetary</p>
        <ul class="hot-hashtags">
        </ul>
    </div>`
}
