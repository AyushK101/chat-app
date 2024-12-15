"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORIGIN = exports.MONGO_URI = void 0;
const MONGO_URI = process.env.MONGO_URI || '';
exports.MONGO_URI = MONGO_URI;
const ORIGIN = process.env.NODE_ENV == 'production' ? '' : process.env.ORIGIN || '';
exports.ORIGIN = ORIGIN;
//# sourceMappingURL=constants.js.map