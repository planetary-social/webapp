# webapp

[![Netlify Status](https://api.netlify.com/api/v1/badges/e3e33fd9-bbef-43b9-932b-edfeacbf9157/deploy-status)](https://app.netlify.com/sites/planetary-webapp/deploys)

Trying netlify

* https://app.netlify.com/sites/planetary-webapp/overview
* https://planetary-webapp.netlify.app/

## develop
Be sure to setup the environment variables.

```
$ npm start
```

## environment
The variable "TEST_PW" is used for testing invitations.

```
FAUNADB_SERVER_SECRET="123"
FAUNADB_SERVER_SECRET_TEST="123"
CLOUDINARY_CLOUD_NAME="https-www-planetary-social"
CLOUDINARY_URL="cloudinary://123"
CLOUDINARY_API_SECRET="123"
CLOUDINARY_API_KEY="123"
TEST_PW="123"
```

## lambda functions
docs:
https://docs.netlify.com/functions/overview/

## test

```
$ npm test
```

This will test the API functions, but only on your local machine. However, it does use the internet to call the database, [faunadb](https://fauna.com/).

-------------------------------------------


## examples

### src/client.js
This is a module that works in browsers or node, because it uses `isomorphic-fetch`. It makes http calls to the backend, either hosted locally or via netlify.

```js
require('dotenv').config()
// `client` requires some env vars
// FAUNADB_SERVER_SECRET="fnAEXtDjCoACQPYVjES3is6I1thIGlPqHMz86Z1J"
// CLOUDINARY_URL=cloudinary://...
// CLOUDINARY_CLOUD_NAME="https-www-planetary-social"
// CLOUDINARY_API_SECRET="123"
// CLOUDINARY_API_KEY="123"

var client = require('../src/client')
client.post({ public: keys.public }, msg, [ myBlobInBase64 ])
    .then(/*...*/)
```

#### client.followMe
Tell the server to follow a user. It requires a password. The server must be 'following' you in oder to write to the DB.

```js
test('follow me', t => {
    client.followMe(keys, process.env.TEST_PW)
        .then(() => {
            t.pass('should get an ok response')
        })
        .then(() => {
            client.followMe(ssc.createKeys(), 'bad password')
                .then(() => {
                    t.fail('should get an error response if the password is bad')
                    t.end()
                })
                .catch((err) => {
                    t.pass('should return an error for bad password')
                    t.end()
                })
        })
        .catch(err => {
            console.log('errrr', err)
            t.fail(err)
            t.end()
        })
})
```

#### client.post
Write a new message.

```js
test('post', t => {
    var msg = ssc.createMsg(keys, null, {
        type: 'test',
        text: 'wooo',
        mentions: [createHash(base64Caracal)]
    })

    client.post(keys, msg, [ base64Caracal ])
        .then((res) => {
            t.pass('should post a new message')
            t.equal(res.msg.value.author, keys.id,
                'should return the right msg')
            t.end()
        })
        .catch ((err) => {
            console.log('errrr', err)
            t.fail('should not get an error')
            t.end()
        })
})
```

#### client.getRelevantPosts
Get a single page of messages that are within your view, ordered by post-time.

```js
test('get relvant posts', t => {
    client.getRelevantPosts(keys.id)
        .then(res => {
            t.equal(res.msg[0].value.author, keys.id,
                'should return your message')
            t.equal(ssc.getId(res.msg[0].value), res.msg[0].key,
                'should return the expected message')
            t.end()
        })
        .catch(err => {
            t.fail(err.toString())
            t.end()
        }) 
})
```

## reading

[pinata - how-to-easily-host-a-website](https://medium.com/pinata/how-to-easily-host-a-website-on-ipfs-9d842b5d6a01)

[pinata medium - the ipfs gateway problem](https://medium.com/pinata/the-ipfs-gateway-problem-64bbe7eb8170)

-------------------------------

[How to Deploy an IPFS Node on Digital Ocean](https://medium.com/pinata/how-to-deploy-an-ipfs-node-on-digital-ocean-c59b9e83098e)

--------------------------------

[cloudflare ipfs gateway](https://blog.cloudflare.com/distributed-web-gateway/)

**Read this**
[cloudlfare -- setting up a server](https://developers.cloudflare.com/distributed-web/ipfs-gateway/setting-up-a-server)

--------------------------------

[ipfs gateway](https://github.com/ipfs/go-ipfs/blob/master/docs/gateway.md)

