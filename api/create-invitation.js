require('dotenv').config()
var faunadb = require('faunadb')

// we can use the netlify backend to create an invitation code
// then it gets verified in the render.com backend

var q = faunadb.query
var client = new faunadb.Client({
    // this is the secret for `planetary-pub` DB
    //https://dashboard.fauna.com/db/us/planetary-pub 
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.us.fauna.com'
})

exports.handler = function (ev, ctx, cb) {
    try {
        var { keys, msg } = JSON.parse(ev.body)
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: JSON.stringify({
                ok: false,
                error: 'invalid json',
                message: err.message
            })
        })
    }



    // check if we are following the inviter
    // client.query(/*...*/)
    // if we are, then create an invitation
    // write a new document that is an invitation
    // client.query(/*...*/)

    client.query(
        
    )

}
