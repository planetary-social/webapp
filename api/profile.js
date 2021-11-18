require('dotenv').config()
var profile = require('@nichoth/ssc-fauna/profile')

exports.handler = function (ev, ctx, cb) {
    if (ev.httpMethod !== 'POST' && ev.httpMethod !== 'GET') {
        return cb(null, {
            statusCode: 400,
            body: 'should be a GET or POST request'
        })
    }

    try {
        var { msg, userId, file } = JSON.parse(ev.body)
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: 'invalid json'
        })
    }

    // should be given an extended profile in the request
    // meaning we get a full profile object
    // with any fields changed as need be

    // (id, file, msg)
    profile.post(userId, file, msg)
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
