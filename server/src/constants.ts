const MONGO_URI = process.env.MONGO_URI || '';
const ORIGIN = process.env.NODE_ENV == 'production' ? '' : process.env.ORIGIN || '';
const PORT = process.env.PORT || 3000
const OAUTH_URI = process.env.OAUTH_URI
const JWT_SECRET = process.env.JWT_SECRET || ""
const JWT_EXPIRE = process.env.JWT_EXPIRE

export { MONGO_URI, ORIGIN, PORT, OAUTH_URI, JWT_SECRET, JWT_EXPIRE};
