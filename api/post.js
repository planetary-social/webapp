let cloudinary = require("cloudinary").v2;
var faunadb = require('faunadb')
var ssc = require('@nichoth/ssc')
var createHash = require('./create-hash')
var sscBlobs = require('@planetary-ssb/ssc-blobs')
var writeBlob = sscBlobs.cloudinary.write

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// requests are like
// { keys: { public }, msg: {} }

// "msg": {
//     "previous": null,
//     "sequence": 1,
//     "author": "@vYAqxqmL4/WDSoHjg54LUJRN4EH9/I4A/OFrMpXIWkQ=.ed25519",
//     "timestamp": 1606692151952,
//     "hash": "sha256",
//     "content": {
//         "type": "test",
//         "text": "waaaaa"
//     },
//     "signature": "wHdXRQBt8k0rFEa9ym35pNqmeHwA+kTTdOC3N6wAn4yOb6dsfIq/X0JpHCBZVJcw6Luo6uH1udpq12I4eYzBAw==.sig.ed25519"
// }


exports.handler = function (ev, ctx, cb) {
    try {
        var { keys, msg, files } = JSON.parse(ev.body)
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


    var isValid
    try {
        isValid = (ssc.verifyObj(keys, null, msg) &&
            msg.content.mentions.length === files.length &&
            files.reduce((acc, file, i) => {
                return acc && (createHash(file) === msg.content.mentions[i])
            }, true)
        )
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: JSON.stringify({
                ok: false,
                error: err.toString(),
                message: msg
            })
        })
    }

    if (!isValid) {
        return cb(null, {
            statusCode: 422,
            body: 'invalid message'
        })
    }

    var q = faunadb.query
    var client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET
    })

    // check that the keys.id is on the `allowed` list -- the list of
    // people that the server is following
    client.query(
        q.Get( q.Match(q.Index('server-following-who'), '@' + keys.public) )
    )
        .then(() => {
            // post the stuff
            write(msg)
                .then(res => {
                    cb(null, {
                        statusCode: 200,
                        body: JSON.stringify({
                            ok: true,
                            msg: res
                        })
                    })
                })
                .catch(err => {
                    return cb(null, {
                        statusCode: 500,
                        body: err.toString()
                    })
                })
        })
        .catch(err => {
            // we are not following them
            return cb(null, {
                statusCode: 401,
                body: err.toString()
            })
        })



    function write (msg) {
        return Promise.all([
            writeBlob(cloudinary, base64Caracal),
            writeMsgToDB(msg).then(res => {
                return res
            })
        ])
            .then(arr => {
                return arr
            })
            .catch((err) => {
                console.log('errrrrr', err)
            })
    }


    // return the new msg
    function writeMsgToDB (msg) {
        var msgHash = ssc.getId(msg)

        // @TODO
        // should validate the shape of the msg before querying

        return client.query(
            q.Create(q.Collection('posts'), {
                key: msgHash,
                value: msg,
            })
        )
            .then(res => {
                return res
            })
    }

}