import { html } from 'htm/preact'
import { useEffect } from 'preact/hooks';
var evs = require('../../EVENTS')
var HeadPart = require('../head-part')
var AnonymousView = require('./anonymous')

function HomeView (props) {
    var { profile } = props

    return html`
        <${HeadPart} />
        ${profile ?
            html`<${FeedView} ...${props} profile=${profile} />` :
            html`<${AnonymousView} />`
        }
    `
}

function FeedView ({ profile, emit, feed }) {
    // componentDidMount
    useEffect(() => {
        emit(evs.feed.get, profile.keys.id)
    }, []);

    return html`<div class="content-view">
        <h2><a href="/profile">${profile.name}</a></h2>
        ${feed ?
            html`<ul class="feed">
                ${feed.map(post => {
                    return html`<li>
                        <p>${post.value.content.text}</p>
                    </li>`
                })}
            </ul>` :
            null
        }
    </div>`
}

module.exports = HomeView
