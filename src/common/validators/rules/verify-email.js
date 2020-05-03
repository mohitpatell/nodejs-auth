const signup = require('./signup')

module.exports = {
    email: signup.email,
    verifyCode: {
        in: ['body'],
        errorMessage: '"PIN code" field is missing',
        exists: true
    }
}
