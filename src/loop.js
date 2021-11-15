// setup a loop of events + state changes
var Bus = require('@nichoth/events')
var observ = require('observ')
var struct = require('observ-struct')
var evs = require('./EVENTS')

module.exports = function loop () {
    var state = State()
    var bus = Bus({ memo: true })
    Subscribe(bus, state)

    return { bus, state }
}

function State () {
    return struct({
        foo: observ('bar')
    })
}

function Subscribe (bus, state) {
    bus.on(evs.example.foo, ev => {
        ev.preventDefault()
        state.foo.set('example')
    })
}
