import { html } from 'htm/preact'

function Block ({ children }) {
    return html`<div class="pl-block">
        ${children}
    </div>`
}

module.exports = Block
