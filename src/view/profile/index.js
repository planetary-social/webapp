import { html } from 'htm/preact'
var { TextInput, Button } = require('@nichoth/forms/preact')
var HeadPart = require('../head-part')
var evs = require('../../EVENTS')

function Profile (props) {
    var { profile } = props

    if (profile) {
        return html`
            <${HeadPart} />
            <${ProfileView} profile=${profile} />
        `
    }

    return html`<${Create} ...${props} />`
}

function Invitation () {
    return html`<div class="invitation">

    </div>`
}

function ProfileView ({ profile }) {
    return html`<div class="pl-profile content-view">
        <dl>
            <dt>your name</dt>
            <dd>${profile.name}</dd>
        </dl>
    </div>`
}

function Create ({ emit }) {
    function createAcct (ev) {
        ev.preventDefault()
        emit(evs.profile.create, ev.target.elements.username.value)
    }

    return html`
        <${HeadPart} />

        <div class="pl-create">
            <h2>Create an account</h2>

            <form class="acct-form" onsubmit=${createAcct}>
                <${TextInput} name="username" displayName="name" required />
                <div class="form-controls">
                    <${Button} type="submit">Create a profile<//>
                </div>
            </form>
        </div>
    `
}

module.exports = Profile
