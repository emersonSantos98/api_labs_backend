class AppError extends Error {
    constructor(message, statusCode= 404, code = 'ERR_GENERIC', data = null) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.data = data;
    }
}

module.exports = {
    AppError,
    ERR_AUTHENTICATION_FAILED: 'ERR_AUTHENTICATION_FAILED',
    ERR_INVALID_INPUT: 'ERR_INVALID_INPUT',
    ERR_GENERIC: 'ERR_GENERIC',
};
