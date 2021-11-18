require('dotenv').config()
var profile = require('@nichoth/ssc-fauna/profile')

exports.handler = function (ev, ctx, cb) {
    if (ev.httpMethod !== 'POST') {
        return cb(null, {
            statusCode: 400,
            body: 'should be a POST request'
        })
    }

    try {
        var { msg, userId } = JSON.parse(ev.body)
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: 'invalid json'
        })
    }

    // (id, file, msg)
    profile.post(userId, null, msg)
        .then(res => {
            cb(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(err => {
            cb(null, {
                statusCode: 500,
                body: err.toString()
            })
        })
}
