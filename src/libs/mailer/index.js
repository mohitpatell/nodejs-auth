const { resolve } = require('path')
const { readFile } = require('fs')
const { compile } = require('ejs')
const sgMail = require('@sendgrid/mail')

const { 
    SENDGRID_FROM_EMAIL,
    SENDGRID_SENDER,
    SENDGRID_API_KEY
} = require('../../../config/config')

sgMail.setApiKey(SENDGRID_API_KEY)

// eslint-disable-next-line no-undef
const templateBasePath = resolve(__dirname, './template')

const readAndCompileTemplate = async (data) => {
    return new Promise((resolve, reject) => {
        const file = `${templateBasePath}/${data.type}.ejs`
        readFile(file, 'utf8', (error, templateData) => {
            if (error) {
                reject(error)
            }
            const compiled = compile(templateData)(data.vars)
            resolve(compiled)
        })
    })
}

const send = async (data) => {
    const email = {
        from: { email: `${SENDGRID_FROM_EMAIL}`, name: `${SENDGRID_SENDER}` },
        to: data.to,
        subject: data.subject,
        html: await readAndCompileTemplate(data)
    }
    return new Promise((resolve, reject) => {
        sgMail.send(email, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        })
        resolve(true)
    })
}

module.exports = send
