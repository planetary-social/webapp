var ssc = require('@nichoth/ssc')

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

        create: function (name) {
            const keys = ssc.createKeys();

            return {
                name,
                keys
            }
        }
    }
}

module.exports = Profile
