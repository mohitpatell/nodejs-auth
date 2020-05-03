const jwt = require('jsonwebtoken')
const { isEmpty } = require('lodash')
const { Response } = require('../response-formatter')
const { STATUS_CODE } = require('../helpers/response-code')
const { AUTHENTICATION } = require('../helpers/constant')
const { User } = require('../../../db/models')
const { redisClient } = require('./redisClient')
const { decrypt } = require('./crypto')

const authenticationToken = 'AwerT$&*123PoqweCv'


const validateUser = async (token, username) => {
    let isExist = await redisClient.getAsync(`${token}`)
    // console.log(isExist,'validate $$$$')
    if (isExist) {
        const isUser = await User.findOne({ account_name: `${username}` })
        isExist = !isEmpty(isUser)
    }
    return isExist
}

const removeToken = async (token) => {
    await redisClient.del(token)
}

const genJWTToken = async (username, expTime) => {
    const token = jwt.sign({ id: username }, authenticationToken, {
        expiresIn: expTime // expires in 30 mins 
    })
    await redisClient.setAsync(token, username)
    let isExist = await redisClient.getAsync(`${token}`)
    console.log(isExist,'validate $$$$')
    redisClient.expire(token, expTime)
    return token
}

const isAuthenticate = async (req, res, next) => {
    let response = Response(STATUS_CODE.SUCCESS, AUTHENTICATION.SUCCESS, false, '')

    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        // console.log(token,'&&&&&')
        if (token) {
            console.log('hit #@#####')
            // const decrypedToken = decrypt(token)
            console.log(token,'before decoded #####')
            const decoded = jwt.verify(token, authenticationToken)
            console.log(decoded,'after decoded #####')
            if (decoded.exp <= (Date.now() / 1000)) {
                response.statusCode = STATUS_CODE.EXPIRED_VALUE
                response.message = AUTHENTICATION.TOKEN_EXPIRED
            } else {
                req.body.email = decoded.id
                const isUser = await validateUser(`${token}`, decoded.id)
                if (!isUser) {
                    response.statusCode = STATUS_CODE.INVALID_VALUE
                    response.message = AUTHENTICATION.INVALID_TOKEN
                }
            }
        }
    } catch (err) {
        response.statusCode = STATUS_CODE.SERVER_ERROR
        response.message = AUTHENTICATION.TOKEN_NOT_FOUND
        response.hasError = true
        console.log("Has gone is in catch blog", response.hasError)
    }
    console.log("After Catch Block ##*&&&&",response.hasError)

    if (response.hasError) {
        console.log('has error true !@!@@@')
     res.send(response)
    } else {
        next()
    }
}

module.exports = {
    genJWTToken,
    isAuthenticate,
    validateUser,
    removeToken
}
