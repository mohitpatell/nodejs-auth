const verifyEmail = require('./verify-email')
const signup = require('./signup')
const login = require('./login')
const resetPassword = require('./reset-password')

module.exports = {
    verifyEmail,
    resetPassword,
    signup,
    login
}
