var _router = require('ruta3')
var Home = require('./view/home')
var Create = require('./view/create')

function Router () {
    var router = _router()

    router.addRoute('/', () => {
        return { view: Home }
    })

    router.addRoute('/create', () => {
        return { view: Create }
    })

    return router
}

module.exports = Router
