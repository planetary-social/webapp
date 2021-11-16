import { html } from 'htm/preact'
var { TextInput, Button } = require('@nichoth/forms/preact')
var HeadPart = require('../head-part')
var evs = require('../../EVENTS')

function Profile (props) {
    console.log('props', props)
    var { profile } = props
    return props.profile ?
        html`
            <${HeadPart} />
            <div class="pl-profile content-view">
                <p>${profile.name}</p>
            </div>
        ` :
        html`<${Create} ...${props} >`
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

            <p>This will create an identity</p>

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
