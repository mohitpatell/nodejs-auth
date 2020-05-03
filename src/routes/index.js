const { Router } = require('express')

const routes = Router()

routes.use('/users', require('./users'))

module.exports = routes
