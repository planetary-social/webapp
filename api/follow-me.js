require('dotenv').config()
var pwds = require('./passwords.json')
var bcrypt = require('bcrypt')
var faunadb = require('faunadb')
var q = faunadb.query

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

    var { password, user } = req

    // check that savedPw === hash(req.pw)
    var ok = password && pwds.reduce((acc, pwdHash) => {
        // return true if any of them match
        return (acc || bcrypt.compare(password, pwdHash))
    }, false)

    if (!ok) {
        return cb(null, {
            statusCode: 401,
            body: 'Invalid password'
        })
    }

    var client = new faunadb.Client({
        secret: (process.env.NODE_ENV === 'test' ?
            process.env.FAUNADB_SERVER_SECRET_TEST :
            process.env.FAUNADB_SERVER_SECRET)
    })

    // write the the DB that we are following the user
    return client.query(
        q.Create(q.Collection('server-following'), {
            data: { type: 'follow', contact: user }
        })
    )
        .then(res => {
            return cb(null, {
                statusCode: 200,
                body: JSON.stringify(res.data)
            })
        })
        .catch(err => {
            // TODO
            // in here, handle the case where it is an existing user
            // (we are already following them)
            // should return a success in that case
            return cb(null, {
                statusCode: 500,
                body: err.toString()
            })
        })

}
