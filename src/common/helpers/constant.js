module.exports = {
    AUTHENTICATION: {
        SUCCESS: 'Token is valid',
        INVALID_TOKEN: 'Invalid token. Please login again',
        TOKEN_EXPIRED: 'Your session has expired. Please login again',
        TOKEN_NOT_FOUND: 'Invalid request. Please login again',
        EXCEPTION: 'You cannot do any actions now. Please contact our support team.'
    },
    LOGIN: {
        SUCCESS: 'Login is successful',
        INVALID_ACCOUNT: ' This account doesn\'t exist. Please sign up',
        INVALID_EMAIL: 'You entered an invalid email address',
        UNVERIFIED_MAIL: ' Please veify your email address. Click here to resend verification code ',
        WRONG_PASS_EMAIL: 'Your username or password is wrong',
        EXCEPTION: 'Please contact our support team to help'
    },
    LOGOUT: {
        SUCCESS: 'You have successfully logged out',
        EXCEPTION: 'Oops! Something went wrong. Please contact our support team.'
    },
    SIGNUP: {
        SUCCESS: 'Your account registration is successful',
        EMAIL_EXIST: 'This email already exists. Please login.',
        RESEND_CODE: 'Verification code successfully sent to your email',
        RESEND_PWD: 'A new passwordsuccessfully sent to your email',
        USER_NOT_EXIST: 'This user does not exist',
        EXCEPTION: 'Our system is busy, kindly go back in couple hours for singing up'
    },
    VERIFY_MESSAGE: {
        SUCCESS: 'Your account verificaiton is successful.',
        INVALID_PASSCODE: 'The verification code is wrong. Please try again',
        EXPIRED_PASSCODE: 'The verification code has expired. Click here to resend one',
        EMAIL_NOT_FOUND: 'You will receive an email in your inbox if this email is registered on Platform.',
        EXCEPTION: 'It seems you cannot verify your code now, kindly try in a minute'
    },
    VERIFY_STATUS: {
        VERIFIED: 'verified',
        UNVERIFIED: 'unverified'
    },

    TYPE_LOG: {
        USER: 'USER'
    }
}
