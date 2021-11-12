require('dotenv').config()
var pwds = require('./passwords.json')
var followMe = require('@nichoth/ssc-fauna/follow-me')

exports.handler = function (ev, ctx, cb) {
    // check that method is POST
    if (ev.httpMethod !== 'POST') {
        return cb(null, {
            statusCode: 400,
            body: (new Error('should be a post request')).toString()
        })
    }

    var req
    try {
        req = JSON.parse(ev.body)
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: 'invalid json'
        })
    }

    var { password, userId } = req

    followMe(pwds, password, userId)
        .then(res => {
            cb(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(err => {
            return cb(null, {
                statusCode: 401,
                body: err.toString()
            })
        })

}
