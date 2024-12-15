"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map