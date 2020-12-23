const crypto = require('crypto')

const password = 'G#379thoTzrU$%nKAsert%6^789UtyCV'
const IV_SIZE = 16

const encrypt = (plainText) => {
    const iv = crypto.randomBytes(IV_SIZE)
    const cipher = crypto.createCipheriv('aes-256-cbc', password, iv)
    let cipherText = cipher.update(Buffer.from(plainText, 'utf8'))
    cipherText = Buffer.concat([cipherText, cipher.final()])
    const combinedData = Buffer.concat([iv, cipherText])
    const combinedString = combinedData.toString('base64')
    return combinedString
}

const decrypt = (encryptedPinCode) => {
    const combinedData = Buffer.from(encryptedPinCode, 'base64')
    const iv = Buffer.alloc(IV_SIZE)
    const cipherText = Buffer.alloc(combinedData.length - iv.length)
    combinedData.copy(iv, 0, 0, iv.length)
    combinedData.copy(cipherText, 0, iv.length)
    const decipher = crypto.createDecipheriv('aes-256-cbc', password, iv)
    let pinCode = decipher.update(cipherText, 'utf8')
    pinCode += decipher.final('utf8')
    return pinCode
}

module.exports = {
    decrypt,
    encrypt
}
