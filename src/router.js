var _router = require('ruta3')
var Home = require('./view/home')

function Router () {
    var router = _router()

    router.addRoute('/', () => {
        return { view: Home }
    })

    return router
}

module.exports = Router
