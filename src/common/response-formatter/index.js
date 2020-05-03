const { HTTP_STATUS_CODE } = require('../helpers/response-code')

const Response = (statusCode, msg, data) => {
    return {
        statusCode: statusCode,
        message: msg,
        data: data
    }
}

const systemError = (msg) => {
    return Response(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, msg, '')
}



module.exports = {
    Response,
    systemError
}
