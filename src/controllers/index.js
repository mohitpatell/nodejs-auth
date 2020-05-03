const { 
    login,
    logout,
    signup,
    reSendCode
} = require('./userController')

const {
    verifyEmail,
    resetPassword
} = require('./emailController')
module.exports = {
    login,
    logout,
    signup,
    reSendCode,
    verifyEmail,
    resetPassword
}
