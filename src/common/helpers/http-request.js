'use strict'

const httpRequest = require('request-promise')

/**
 * Common Form based request to make a call from yensesa app
 * @param req
 * @param simple
 * @param resolveWithFullResponse
 * @returns {Promise<void>}
 * @private
 */
exports._formHttpRequest = async (req, simple = false, resolveWithFullResponse = true) => {
    const options = {
        method: req.action,
        uri: req.url,
        formData: req.body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            ...req.headers
        },
        json: true,
        simple,
        resolveWithFullResponse
    }
    return httpRequest(options)
}

/**
 * Common JSON based request to make a call from yensesa app
 * @param req
 * @param simple
 * @param resolveWithFullResponse
 * @returns {Promise<void>}
 * @private
 */
exports._jsonHttpRequest = async (req, simple = false, resolveWithFullResponse = true) => {
    const options = {
        method: req.action,
        uri: req.url,
        body: req.body,
        json: true,
        headers: {
            ...req.headers
        },
        simple,
        resolveWithFullResponse
    }
    return httpRequest(options)
}
