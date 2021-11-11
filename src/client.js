var BASE_URL = process.env.NODE_ENV === 'test' ? 'http://localhost:8888' : ''

module.exports = {
    post: function (msg, files) {
        return fetch(BASE_URL + '/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ msg, files })
        })
            .then(res => res.json())
    }
}
