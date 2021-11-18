import { html } from 'htm/preact'
var HeadPart = require('../head-part')
var AnonymousView = require('./anonymous')

function HomeView (props) {
    var { profile } = props
    return html`
        <${HeadPart} />
        ${profile ?
            html`<div class="content-view">
                <h2><a href="/profile">${profile.name}</a></h2>
                <p>feed goes here</p>
            </div>` :
            html`<${AnonymousView} />`
        }
    `
}

module.exports = HomeView
