"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const db_1 = __importDefault(require("./db/db"));
(async () => await (0, db_1.default)(constants_1.MONGO_URI))();
//# sourceMappingURL=index.js.map