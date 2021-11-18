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

function ProfileView ({ profile }) {
    return html`<div class="pl-profile content-view">
        <dl>
            <dt>your name</dt>
            <dd>${profile.name}</dd>
        </dl>
    </div>`
}

function Create (props) {
    var { emit, setRoute } = props

    function createAcct (ev) {
        ev.preventDefault()
        var values = ['username', 'code'].reduce((acc, val) => {
            acc[val] = ev.target.elements[val].value
            return acc
        }, {})
        emit(evs.profile.create, values)
    }

    return html`
        <${HeadPart} />

        <div class="pl-create">
            <h2>Create an account</h2>

            <form class="acct-form" onsubmit=${createAcct}>
                <${TextInput} name="username" displayName="Name" required />
                <${TextInput} name="code" displayName="Invitation code"
                    required />
                <div class="form-controls">
                    <${Button} type="submit">Create a profile<//>
                </div>
            </form>
        </div>
    `
}

module.exports = Profile
