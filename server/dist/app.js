"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const logger_1 = require("./utils/logger");
const globalErrCatch_1 = __importDefault(require("./utils/globalErrCatch"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: constants_1.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(logger_1.morganMiddleware);
const userRouter_1 = __importDefault(require("./routes/userRouter"));
app.use('/api/v1/user', userRouter_1.default);
app.use('/api/v1/');
app.use(globalErrCatch_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map