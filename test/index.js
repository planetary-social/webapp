var test = require('tape')
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

test('post', t => {
    var keys = ssc.createKeys()
    // (keys, prevMsg, content)
    var msg = ssc.createMsg(keys, null, {
        type: 'test',
        text: 'wooo',
        mentions: [createHash(base64Caracal)]
    })

    client.post({ public: keys.public }, msg, [ base64Caracal ])
        .then(res => {
            console.log('res', res)
            t.fail("should get an error if we're not following them")
            t.end()
        })
        .catch (err => {
            t.pass("returns an error because we're not following them")
            t.ok(err.toString().includes('NotFound'),
                "should return an error that you're not following the user")
            t.end()
        })
})

test('all done', function (t) {
    ntl.kill()
    t.end()
})
