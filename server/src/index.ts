import { MONGO_URI } from './constants';
import connectDb from './db/db';

(async () => await connectDb(MONGO_URI))();
