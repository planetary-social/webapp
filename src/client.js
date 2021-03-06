require('isomorphic-fetch')
var BASE_URL = process.browser ? '' : 'http://localhost:8888'

module.exports = {
    post: function (keys, msg, files) {
        return fetch(BASE_URL + '/.netlify/functions/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keys: { public: keys.public },
                msg,
                files
            })
        })
            .then(async res => {
                if (!res.ok) {
                    throw new Error(await res.text())
                }

                return res.json()
            })
    },

    followMe: function (keys, password) {
        return fetch(BASE_URL + '/.netlify/functions/follow-me', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: keys.id,
                password
            })
        })
            .then(async res => {
                if (!res.ok) throw new Error(await res.text())
                return res.json()
            })
    },

    getRelevantPosts: function (userId) {
        var qs = new URLSearchParams({
            userId: userId,
            foafs: true
        }).toString()

        var url = (BASE_URL + '/.netlify/functions/relevant-posts' +
            '?' + qs)

        return fetch(url)
            .then(res => {
                if (!res.ok) return res.text()
                return res.json()
            })
    },

    saveProfile: function (keys, file, msg) {
        return fetch(BASE_URL + '/.netlify/functions/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: keys.id,
                file,
                msg  // msg 
            })
        })
            .then(res => {
                if (!res.ok) return res.text()
                return res.json()
            })
    }

    // redeemInvitation: function (userId, profile, code) {
    //     return fetch(BASE_URL + '/.netlify/function/redeem-invitation', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             userId,
    //             code,
    //             profile
    //         })
    //     })
    //         .then(res => {
    //             if (!res.ok) return res.text()
    //             return res.json()
    //         })
    // }
}
