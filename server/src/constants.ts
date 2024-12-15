const MONGO_URI = process.env.MONGO_URI || '';
const ORIGIN = process.env.NODE_ENV == 'production' ? '' : process.env.ORIGIN || '';
export { MONGO_URI, ORIGIN };
