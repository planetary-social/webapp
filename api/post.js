let cloudinary = require("cloudinary").v2;
var ssc = require('@nichoth/ssc')

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
        var { keys, msg, file } = JSON.parse(ev.body)
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
        isValid = ssc.verifyObj(keys, null, msg)
    } catch (err) {
        return cb(null, {
            statusCode: 422,
            body: JSON.stringify({
                ok: false,
                error: err,
                message: msg
            })
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

}
