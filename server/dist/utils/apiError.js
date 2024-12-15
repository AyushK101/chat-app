"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error, stack) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.stack = stack;
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map