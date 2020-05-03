const signup = require('./signup')
const email = require('./verify-email')
module.exports = {
    email: signup.email,
    verifyCode: email.verifyCode,
    newPassword: signup.password
}
