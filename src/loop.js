// setup a rendering loop
var Bus = require('@nichoth/events')
var observ = require('observ')
var struct = require('observ-struct')

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
    bus.on('example', ev => {
        ev.preventDefault()
        state.foo.set('example')
    })
}
