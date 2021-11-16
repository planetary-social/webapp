import { html } from 'htm/preact'
var Logo = require('./logo')
var AppStore = require('./app-store')

function HeadPart () {
    return html`<header class="site-header">
        <h1><${Logo} /> Planetary</h1>
        <a href="/"><${AppStore} /></a>
    </header>
    `
}

module.exports = HeadPart
