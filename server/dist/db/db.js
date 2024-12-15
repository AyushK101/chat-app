"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../utils/apiError"));
async function connectDb(mongoUri) {
    var _a, _b, _c, _d;
    try {
        console.log(mongoUri);
        const response = await mongoose_1.default.connect(mongoUri);
        const connected = {
            host: (_a = response === null || response === void 0 ? void 0 : response.connection) === null || _a === void 0 ? void 0 : _a.host,
            port: (_b = response === null || response === void 0 ? void 0 : response.connection) === null || _b === void 0 ? void 0 : _b.port,
            db: (_d = (_c = response === null || response === void 0 ? void 0 : response.connection) === null || _c === void 0 ? void 0 : _c.db) === null || _d === void 0 ? void 0 : _d.databaseName,
        };
        console.log(`DB connected successfully: ${connected.host}:${connected.port}/${connected.db}`);
    }
    catch (error) {
        throw new apiError_1.default(500, 'failed to connect to DB', error);
    }
}
//# sourceMappingURL=db.js.map