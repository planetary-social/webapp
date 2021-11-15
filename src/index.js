import { html } from 'htm/preact'
import { useState } from 'preact/hooks';
import { render } from 'preact'

console.log('wooo')

function App () {
    return html`<p>hello world</p>`
}

render(html`<${App} />`, document.getElementById('content'))
