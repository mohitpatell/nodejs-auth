const { Router } = require('express')

const { isAuthenticate } = require('../common/helpers/auth')
const {
    signup,
    reSendCode,
    login,
    logout,
    verifyEmail,
    resetPassword
} = require('../controllers')

const {
    validateSignup,
    validateVerifyEmail,
    validateLogin,
    validateResetPass
} = require('../common/validators')

const routes = Router()

routes.post('/register', validateSignup, signup)
routes.post('/resend', reSendCode)
routes.post('/login', validateLogin, login)
routes.post('/logout', isAuthenticate, logout)
routes.post('/email/verify', validateVerifyEmail, verifyEmail)
routes.post('/password/reset', validateResetPass, resetPassword)

module.exports = routes
