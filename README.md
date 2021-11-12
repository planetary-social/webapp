# webapp

[![Netlify Status](https://api.netlify.com/api/v1/badges/e3e33fd9-bbef-43b9-932b-edfeacbf9157/deploy-status)](https://app.netlify.com/sites/planetary-webapp/deploys)

Trying vercel

* https://vercel.com/planetary-webapp/webapp
* https://webapp-blush.vercel.app/api/test

--------------------------------

Trying netlify

* https://app.netlify.com/sites/planetary-webapp/overview
* https://planetary-webapp.netlify.app/

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

