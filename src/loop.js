// setup a loop of events + state changes
var Bus = require('@nichoth/events')
var observ = require('observ')
var struct = require('observ-struct')
var evs = require('./EVENTS')
import { html } from 'htm/preact'
var route = require('route-event')()
var Profile = require('./profile')
var { PROFILE_STORAGE_KEY } = require('./CONSTANTS')
var client = require('./client')

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
        feed: observ(null),
        routePath: observ(null)
    })
}

function Subscribe (bus, state) {
    var profile = Profile(PROFILE_STORAGE_KEY)

    bus.on(evs.profile.create, (ev) => {
        var { username, code, file } = ev
        var p = profile.create(username, file)
        var { keys, msg } = p
        // state.profile.set(p)
        // followMe: function (keys, password) {
        client.followMe(keys, code)
            .then(res => {
                return res
            })
            .then(() => client.saveProfile(keys, null, msg))
            .then(() => {
                profile.save(p)
                state.profile.set(p)
            })
    })

    bus.on(evs.feed.get, (id) => {
        console.log('**get feed', id)
        client.getRelevantPosts(id)
            .then(res => {
                console.log('got posts', res)
                state.feed.set(res.msg)
            })
    })
}
