const { config } = require('dotenv')

config()

/*eslint-disable */
module.exports = {
    MONGO_URL: process.env.MONGO_URL || '',
    SERVER_PORT: 3000,
    // REDIS_URL: process.env.REDIS_URL,
    REDIS_URL: 'redis://127.0.0.1:6379',
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    FE_URL: process.env.FE_URL,
    SENDGRID_EMAIL: process.env.SENDGRID_FROM_EMAIL,
    SENDGRID_SENDER: process.env.SENDGRID_SENDER,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}
