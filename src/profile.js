var ssc = require('@nichoth/ssc')
var createHash = require('./create-hash')

function Profile (key) {
    return {
        save: function (profile) {
            window.localStorage.setItem( key, JSON.stringify(profile) )
            return profile
        },

        get: function () {
            var lsItem = localStorage.getItem(key)
            return lsItem ? JSON.parse(lsItem) : null
        },

        create: function (name, file) {
            const keys = ssc.createKeys();
            var profileMsg = ssc.createMsg(keys, null, {
                type: 'profile',
                name: name,
                avatar: file ? createHash(file) : null
            })

            return {
                msg: profileMsg,
                keys
            }
        }
    }
}

module.exports = Profile
