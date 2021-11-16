import { html } from 'htm/preact'
var AppStore = require('./app-store')
var Logo = require('./logo')
var Block = require('./block')

const TAGS = [
    { tag: '#CyberPunkRevolution', count: 1768 },
    { tag: '#BlackLivesMatter', count: 745 },
    { tag: '#FreeBritneyNow', count: 692 },
    { tag: '#LaserEyesTill100k', count: 581 }
]

function AnonymousView (props) {
    return html`
        <${HeadPart} />
    
        <${Block}>
            <${JoinToday} />
            <${Hotness} tags=${TAGS} />
        <//>
    `
}

module.exports = { AnonymousView }

function HeadPart (props) {
    return html`<header class="site-header">
        <h1><${Logo} /> Planetary</h1>
        <a href="/"><${AppStore} /></a>
    </header>
    `
}

function JoinToday () {
    return html`<div class="join-today">
        <h2>Join Planetary today!</h2>
        <p>
            Planetary is a decentralized network for people who want to
            come together and connect even when the internet goes out.
        </p>

        <p>It's an app that doesn't keep your data in the cloud.</p>

        <${CreateAcct} />
    </div>`
}

function CreateAcct () {
    return html`<a class="create-acct" href="/create">
        Create your account
    </a>`
}

function Hotness ({ tags }) {
    return html`<div class="hotness">
        <h2>What's hot on planetary</h2>
        <ul class="hot-hashtags">
            ${tags.map(tag => {
                return html`<li>
                    <a>${tag.tag}</a>
                    <span>(${tag.count})</span>
                </li>`
            })}
        </ul>
    </div>`
}
