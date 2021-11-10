export default function handler (req, res) {
  res.status(200).json({
    body: req.body,
    env: { foo: process.env.FOO }
    query: req.query,
    cookies: req.cookies,
  });
}

