const { 
    REDIS_URL
} = require('../../../config/config')
// const { URL } = require('url')
const Promise = require('bluebird')
const redis = Promise.promisifyAll(require('redis'))
const createRedisClient = (redisUrl) => {
    const redisInstance = redis.createClient(redisUrl, { detect_buffers: true })

    return redisInstance
}

const redisClient = createRedisClient(`${REDIS_URL}`)
module.exports = {
    redisClient
}
