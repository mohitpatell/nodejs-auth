const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const { existsSync, mkdirSync } = require('fs')
const { LOG_LEVEL } = require('../../../config/config')

const logDir = 'log'

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
    mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
})
const logger = createLogger({
    level: `${LOG_LEVEL}` || 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
})
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message)
    }
}

logger.info = (type, content, ...meta) => {
    logger.log({ level: 'info', message: { type, content, meta } })
}

logger.error = (type, content, ...meta) => {
    logger.log({ level: 'error', message: { type, content, meta } })
}

logger.debug = (type, content, ...meta) => {
    logger.log({ level: 'debug', message: { type, content, meta } })
}

module.exports = logger
