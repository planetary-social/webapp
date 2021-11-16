import { html } from 'htm/preact'
var HeadPart = require('../head-part')

function Create (prop) {
    return html`
        <${HeadPart} />
        <div>creating an account</div>
    `
}

module.exports = Create
