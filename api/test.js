// ntl version
exports.handler = function (ev, ctx, cb) {
    return cb(null, {
        statusCode: 200,
        body: 'hello function'
    })
}

// vercel version
// export default function handler (req, res) {
//   res.status(200).json({
//     body: req.body,
//     env: { foo: process.env.FOO },
//     query: req.query,
//     cookies: req.cookies,
//   });
// }

