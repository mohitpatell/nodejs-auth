const { 
    REDIS_URL,
    PUSHER_ID,
    PUSHER_API_KEY,
    PUSHER_SECRET_KEY,
    PUSHER_CLUSTER
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
    redisClient,
}
