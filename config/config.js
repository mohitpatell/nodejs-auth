const { config } = require('dotenv')

config()

/*eslint-disable */
module.exports = {
    MONGO_URL: process.env.MONGO_URL || '',
    SERVER_PORT: 5000,
    // REDIS_URL: redis://127.0.0.1:6379,
    REDIS_URL: 'redis://127.0.0.1:6379',
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    FE_URL: process.env.FE_URL,
    SENDGRID_EMAIL: 'mohitpatel9753@gmail.com',
    SENDGRID_SENDER: 'Mohit',
    SENDGRID_API_KEY: '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'
}
