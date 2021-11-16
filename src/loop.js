// setup a loop of events + state changes
var Bus = require('@nichoth/events')
var observ = require('observ')
var struct = require('observ-struct')
var evs = require('./EVENTS')
import { html } from 'htm/preact'
var route = require('route-event')()
var Profile = require('./profile')
var { PROFILE_STORAGE_KEY } = require('./CONSTANTS')

module.exports = function Loop (initState) {
    var init = (initState && initState.profile) ?
        { profile: initState.profile } :
        null
    var state = State(init)
    var bus = Bus({ memo: true })
    Subscribe(bus, state)

    // this get called immediately
    route(function onChange (path) {
        state.routePath.set(path)
    })

    function loop ({ children, state }) {
        console.log('render', state)
        return html`<div class="planetary">
            ${children}
        </div>`
    }

    return { bus, state, loop, setRoute: route.setRoute }
}

function State (initState) {
    return struct({
        profile: observ((initState && initState.profile) || null),
        routePath: observ(null)
    })
}

function Subscribe (bus, state) {
    var profile = Profile(PROFILE_STORAGE_KEY)

    bus.on(evs.profile.create, (name) => {
        var p = profile.create(name)
        profile.save(p)
        state.profile.set(p)
    })
}
