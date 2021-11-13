let cloudinary = require("cloudinary").v2;
var faunadb = require('faunadb')
var ssc = require('@nichoth/ssc')
var createHash = require('./create-hash')
// var sscBlobs = require('@planetary-ssb/ssc-blobs')
// var writeBlob = sscBlobs.cloudinary.write
var BlobClient = require('@planetary-ssb/ssc-blobs/cloudinary')
var writeMsg = require('@nichoth/ssc-fauna/write-msg')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var blobClient = BlobClient(cloudinary)

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

    // ------------------ input is valid ---------------------------

    var q = faunadb.query
    var client = new faunadb.Client({
        secret: (process.env.NODE_ENV === 'test' ?
            process.env.FAUNADB_SERVER_SECRET_TEST :
            process.env.FAUNADB_SERVER_SECRET)
    })

    client.query(
        q.Get( q.Match(q.Index('server-following-who'), '@' + keys.public) )
    )
        .then(() => {
            // post the stuff
            write(msg, files)
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


    function write (msg, files) {
        return Promise.all([
            Promise.all(files.map(file => {
                return blobClient.write(file)
            })),
            writeMsg(keys, msg, getUrls)
        ])
            .then(arr => {
                return arr[1]
            })
            .catch((err) => {
                console.log('errrrrr', err)
            })
    }

    function getUrls (mentions) {
        return mentions.map(m => blobClient.getUrl(m))
    }
}
