const { isEmpty } = require('lodash')
const { 
    VERIFY_STATUS, 
    VERIFY_MESSAGE,
    TYPE_LOG,
} = require('../common/helpers/constant')
const { STATUS_CODE } = require('../common/helpers/response-code')
const logger = require('../common/helpers/logger')
const { Response, systemError } = require('../common/response-formatter')
const { User } = require('../../db/models')
const sendEmail = require('../common/helpers/email')


const VALID_TIME = 5 * 60 * 1000 // 5 mins

/**
 * 
 * @param {*} inPinCode: Input value for pin code
 * 
 */

const checkVaildPasscode = (inPinCode, userEmail) => {
    let response = Response(STATUS_CODE.NOT_FOUND, VERIFY_MESSAGE.EMAIL_NOT_FOUND, '')
    if (isEmpty(userEmail) || !userEmail) {
        return response
    }
    const { code, expired_at } = userEmail
    if ((inPinCode === code)) {
        if (Date.now() - expired_at > VALID_TIME) {
            response.statusCode = STATUS_CODE.EXISTED_VALUE
            response.message = VERIFY_MESSAGE.EXPIRED_PASSCODE
        } else {
            response.statusCode = STATUS_CODE.SUCCESS
            response.message = VERIFY_MESSAGE.SUCCESS
        }
    } else {
        response.statusCode = STATUS_CODE.INVALID_VALUE
        response.message = VERIFY_MESSAGE.INVALID_PASSCODE
    }
    return response
}

/**
 * Handling user's PIN code
 */
const handlePinCode = async (email, verifyCode, valueUpdate, type) => {
    logger.debug(TYPE_LOG.USER, 'Handling pin code for user: ', { email: `${email}` })
    let response = Response(STATUS_CODE.NOT_FOUND, VERIFY_MESSAGE.INVALID_PASSCODE, '')
    try {
        const existedUser = await User.findOne({ email: `${email.toLocaleLowerCase()}` })
        response = checkVaildPasscode(verifyCode, existedUser)

        if (response.statusCode === STATUS_CODE.SUCCESS)  {
            await User.findOneAndUpdate({ email: `${email.toLocaleLowerCase()}` }, valueUpdate)
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Cannot handle PIN code: ', err.stack)
        if (err.name === 'MongoError') {
            response = systemError(VERIFY_MESSAGE.EXCEPTION)
        } else {
            response.statusCode = STATUS_CODE.BLOCKCHAIN_ERROR
            response.message = ACTION.EXCEPTION
        }
    }
    return response
}
/**
 * Verifi email API handling
 * @param {*} req: in body, pass though email and pin_code
 * @param {*} res: Return error code as API's document
 */
const verifyEmail = async (req, res) => {
    const { email, verifyCode } = req.body
    logger.debug(TYPE_LOG.USER, ' Stating verify email for user: ', { email: `${email}` })
    const response = await handlePinCode(email, verifyCode, 
        {
            email_status: `${VERIFY_STATUS.VERIFIED}`
        })
    res.send(response)
}

/**
 * Reset password API handling 
 */
const resetPassword = async (req, res) => {
    const { 
        email,
        verifyCode,
        newPassword
    } = req.body
    logger.debug(TYPE_LOG.USER, 'Sarting reset password for user: ', { email: `${email}` })
    const response = await handlePinCode(email, verifyCode,
        {
            email_status: `${VERIFY_STATUS.VERIFIED}`,
            password: `${newPassword}`
        })
    res.send(response)
}

module.exports = {
    verifyEmail,
    resetPassword
}
