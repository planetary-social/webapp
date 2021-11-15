import { html } from 'htm/preact'
import { useState } from 'preact/hooks';
import { render } from 'preact'
var loop = require('./loop')
var evs = require('./EVENTS')

var { bus, state } = loop()
var emit = bus.emit.bind(bus)

function App () {
    const [viewState, setViewState] = useState(state())
    state(function onChange (newState) {
        setViewState(newState)
    })

    return html`<div>
        <div>
            hello world
            <p>
                foo: ${viewState.foo}
            </p>
        </div>
        <div>
            <button onclick=${emit(evs.example.foo)}>example</button>
        </div>
    </div>`
}

render(html`<${App} />`, document.getElementById('content'))
