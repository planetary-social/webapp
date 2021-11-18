var test = require('tape')
require('dotenv').config()
var client = require('../src/client')
var { spawn } = require('child_process')
var fs = require('fs')
var ssc = require('@nichoth/ssc')
var createHash = require('../api/create-hash')

var caracal = fs.readFileSync(__dirname + '/caracal.jpg')
let base64Caracal = 'data:image/png;base64,' + caracal.toString('base64')

var ntl
test('setup', function (t) {
    ntl = spawn('npx', ['netlify', 'dev', '--port=8888'])

    ntl.stdout.on('data', function (d) {
        if (d.toString().includes('Server now ready')) {
            t.end()
        }
    })

    ntl.stdout.pipe(process.stdout)
    ntl.stderr.pipe(process.stderr)

    ntl.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    ntl.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
})

var keys
test("post from a user we're not following", t => {
    keys = ssc.createKeys()
    // (keys, prevMsg, content)
    var msg = ssc.createMsg(keys, null, {
        type: 'test',
        text: 'wooo',
        mentions: [createHash(base64Caracal)]
    })

    client.post({ public: keys.public }, msg, [ base64Caracal ])
        .then(() => {
            t.fail("should get an error b/c we're not following them")
            t.end()
        })
        .catch(err => {
            t.pass("returns an error because we're not following them")
            t.ok(err.toString().includes('NotFound'),
                "should return an error that you're not following the user")
            t.end()
        })
})

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
                .catch(() => {
                    t.pass('should return an error for bad password')
                    t.end()
                })
        })
        .catch(err => {
            console.log('errrr', err)
            t.fail(err.toString())
            t.end()
        })

})

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
            t.fail('should not get an error')
            console.log('**err**', err)
            t.end()
        })
})

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

test('all done', function (t) {
    ntl.kill()
    t.end()
})
