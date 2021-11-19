require('dotenv').config()
var profile = require('@nichoth/ssc-fauna/profile')
var ssc = require('@nichoth/ssc')

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


    try {
        var isOk = ssc.isValidMsg(msg, null, userId.substring(1))
    } catch (err) {
        return cb(null, {
            statusCode: 400,
            body: 'invalid message'
        })
    }

    if (!isOk) {
        return cb(null, {
            statusCode: 400,
            body: 'invalid signature'
        })
    }
    


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
