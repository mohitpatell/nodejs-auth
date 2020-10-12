const send = require('../../libs/mailer')
const logger = require('./logger')

const sendEmail = async (toEmail, params, type, subject) => {
    const mailBody = {
        type: `${type}`,
        to: `${toEmail}`,
        subject: `${subject}`,
        vars: {
            ...params
        }
    }
    logger.debug('Sending an email', { email: `${toEmail}` })
    await send(mailBody)
}
module.exports = sendEmail
