const { isEmpty } = require('lodash')
const { User } = require('../../db/models')
const otpGenerator = require('otp-generator')
const { genJWTToken, removeToken } = require('../common/helpers/auth')

const logger = require('../common/helpers/logger')
const { STATUS_CODE } = require('../common/helpers/response-code')
const { Response, systemError } = require('../common/response-formatter')
const sendEmail = require('../common/helpers/email')
const {
    SIGNUP,
    LOGIN,
    LOGOUT,
    VERIFY_STATUS,
    TYPE_LOG
} = require('../common/helpers/constant')

const USER_TOKEN_EXPIRED = 1800 // expires in seconds

const signup = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body

    let isSendEmail = false
    let accountName = username

    let response = Response(STATUS_CODE.SUCCESS, SIGNUP.SUCCESS, '')
    const pinCode = otpGenerator.generate(6, { specialChars: false })
    let validEmail = email.split('+')[0]
    validEmail = validEmail === email ? validEmail : validEmail + '@' + email.split('@')[1]
    try {
        const existedUser = await User.findOne({ email: `${validEmail}` })
        if (isEmpty(existedUser)) {
            const userData = {
                account_name: `${username}`,
                email: `${validEmail.toLocaleLowerCase()}`,
                code: pinCode,
                email_status: VERIFY_STATUS.UNVERIFIED,
                password: `${password}`,
                expired_at: Date.now()
            }
            await User.create(userData)
            isSendEmail = true
        } else if (existedUser.email_status === VERIFY_STATUS.UNVERIFIED) {
            accountName = existedUser.account_name
            await User.findOneAndUpdate({ email: `${email}` },
                { code: pinCode, expired_at: Date.now() })

            isSendEmail = true
        } else {
            response.statusCode = STATUS_CODE.EXISTED_VALUE
            response.message = `${SIGNUP.EMAIL_EXIST}`
        }

        if (isSendEmail) {
            const emailParams = {
                name: accountName,
                info: pinCode
            }
            await sendEmail(email.toLocaleLowerCase(),
                emailParams, 'email_verification', 'Confirm your Platform account!')
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Exeption, user cannot signup: ', err.stack)
        response = systemError(SIGNUP.EXCEPTION)
    }
    res.send(response)
}

/**
 * Resend a `passcode` for verify account
 * @param {*} req: in body, pass through (email, first_name, last_name)
 * @param {*} res: Return error code as API's document
 */
const reSendCode = async (req, res) => {
    const pinCode = otpGenerator.generate(6, { specialChars: false })

    const {
        email,
        isSignup
    } = req.body

    let response = Response(STATUS_CODE.SUCCESS, SIGNUP.RESEND_CODE, { email: `${email}` })
    try {
        const existedUser = await User.findOne({ email: `${email.toLocaleLowerCase()}` })
        if (!isEmpty(existedUser)) {
            await User.findOneAndUpdate({ email: `${email.toLocaleLowerCase()}` }, { code: pinCode, expired_at: Date.now() })
            const emailParams = {
                name: existedUser.account_name,
                info: pinCode
            }
            if (isSignup) {
                await sendEmail(email.toLocaleLowerCase(),
                    emailParams, 'email_verification', 'Confirm your Platform account!')
            } else {
                response.message = SIGNUP.RESEND_PWD
                await sendEmail(email.toLocaleLowerCase(),
                    emailParams, 'reset_password', 'Reset your Platform password!')
            }
        } else {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = SIGNUP.USER_NOT_EXIST
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, ' Cannot resend PIN code for user: ', err.stack)
        response = systemError(SIGNUP.EXCEPTION)
    }
    res.send(response)
}

/**
 * User login API
 * @param {*} req: in body, pass through email value
 * @param {*} res: if login is successful, return user's info and token
 *                 otherwise return error code as API's document
 */
const login = async (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log('hit')
    let response = Response(STATUS_CODE.SUCCESS, LOGIN.SUCCESS, '')
    try {
        const existedUser = await User.findOne({ account_name: `${username}` })

        if (isEmpty(existedUser)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = LOGIN.INVALID_EMAIL
        } else if (existedUser.email_status === VERIFY_STATUS.UNVERIFIED) {
            response.statusCode = STATUS_CODE.UNVERIFIED_EMAIL
            response.message = LOGIN.UNVERIFIED_MAIL
        } else if (password !== existedUser.password) {
            response.statusCode = STATUS_CODE.INVALID_VALUE
            response.message = LOGIN.WRONG_PASS_EMAIL
        } else {
            const token = await genJWTToken(`${username}`, USER_TOKEN_EXPIRED)
            console.log(existedUser, '##user')
            let userInfo = {
                username: existedUser.account_name,
                id: existedUser._id,
                email: existedUser.email,
                userIp: ((req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress),
                lastVisted: Date.now()
            }
            response.data = {
                user: userInfo,
                token: token
            }
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot login: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
    }
    res.send(response)
}

const logout = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, LOGOUT.SUCCESS, '')
    const token = req.headers.authorization.split(' ')[1]
    try {
        await removeToken(token)
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot logout: ', err.stack)
        response = systemError(LOGOUT.EXCEPTION)
    }
    res.send(response)
}

module.exports = {
    signup,
    login,
    logout,
    reSendCode
}
