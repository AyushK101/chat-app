import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';
const PORT = process.env.PORT || 3000
const OAUTH_URI = process.env.OAUTH_URI
const JWT_SECRET = process.env.JWT_SECRET || ""
const JWT_EXPIRE = process.env.JWT_EXPIRE || "10hr"
const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379"
export { MONGO_URI, ORIGIN, PORT, OAUTH_URI, JWT_SECRET, JWT_EXPIRE, REDIS_URI};
