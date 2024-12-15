"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalErrCatch;
const apiError_1 = __importDefault(require("./apiError"));
function globalErrCatch(err, req, res) {
    var _a, _b, _c, _d;
    if (err instanceof apiError_1.default) {
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({
            statuscode: (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500,
            message: (_b = err.message) !== null && _b !== void 0 ? _b : undefined,
            error: (_c = err.error) !== null && _c !== void 0 ? _c : undefined,
            stack: (_d = err.stack) !== null && _d !== void 0 ? _d : undefined,
        });
    }
    else {
        res.status(500).json({
            statusCode: 500,
            error: err,
            globalMsg: 'global error caught',
        });
    }
}
//# sourceMappingURL=globalErrCatch.js.map