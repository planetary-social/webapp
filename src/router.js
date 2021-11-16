var _router = require('ruta3')
var Home = require('./view/home')
var Profile = require('./view/profile')

function Router () {
    var router = _router()

    router.addRoute('/', () => {
        return { view: Home }
    })

    router.addRoute('/profile', () => {
        return { view: Profile }
    })

    return router
}

module.exports = Router
