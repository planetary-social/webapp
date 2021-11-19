require('dotenv').config()
var relevant = require('@nichoth/ssc-fauna/relevant-posts')
var getRelevantPosts = relevant.get
var getWithFoafs = relevant.getWithFoafs
var xtend = require('xtend')
var faunadb = require('faunadb')                    
var q = faunadb.query
var client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

let cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = function (ev, ctx, cb) {
    if (ev.httpMethod !== 'GET') {
        return cb(null, {
            statusCode: 400,
            body: JSON.stringify({
                ok: false,
                message: 'should be a get request'
            })
        })
    }

    // http method is get
    var userId = ev.queryStringParameters.userId
    var foafs = ev.queryStringParameters.foafs

    if (foafs) {
        return getWithFoafs(userId)
            .then(res => {
                // @TODO -- should get rid of this
                // every user should have been invited by anther user
                // we need to track who invited them, and start them off
                // by following the inviter

                // need to add the ability for users to invite other
                // users
                if (process.env.NODE_ENV === 'test') {
                    return client.query(
                        q.Map(
                            q.Paginate(
                                q.Reverse( q.Match(q.Index('posts')) ),
                                { size: 10 }
                            ),
                            q.Lambda( 'post', q.Get(q.Var('post')) )
                        )
                    )
                        // data format
                        .then(res => res.data.map(msg => msg.data))
                }

                return res
            })
            .then(res => {
                return cb(null, {
                    statusCode: 200,
                    body: JSON.stringify({
                        ok: true,
                        // here we need to map them so they have a URL for the
                        // image
                        msg: res.map(msg => {
                            return xtend(msg, {
                                mentionUrls: msg.value.content.mentions ?
                                    msg.value.content.mentions.map(m => {
                                        return cloudinary.url(m)      
                                    }) :
                                    []
                            })
                        })
                    })
                })
            })
            .catch(err => {
                console.log('oh no rrrrrrrr', err)
                return cb(null, {
                    statusCode: 500,
                    body: err.toString()
                })
            })
    }

    getRelevantPosts(userId)
        .then(res => {

            cb(null, {
                statusCode: 200,
                body: JSON.stringify({
                    ok: true,
                    // here we need to map them so they have a URL for the
                    // image
                    msg: res.map(msg => {
                        return xtend(msg, {
                            mentionUrls: (msg.value.content.mentions || [])
                                .map(m => {
                                    return cloudinary.url(m)      
                                })
                        })
                    })
                })
            })
        })
        .catch(err => {
            return cb(null, {
                statusCode: 500,
                body: JSON.stringify({
                    ok: false,
                    message: err.toString()
                })
            })
        })
}
