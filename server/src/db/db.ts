import mongoose from 'mongoose';
import ApiError from '../utils/apiError';

export default async function connectDb(mongoUri: string) {
  try {
    console.log(mongoUri);
    const response = await mongoose.connect(mongoUri);
    const connected = {
      host: response?.connection?.host,
      port: response?.connection?.port,
      db: response?.connection?.db?.databaseName,
    };
    console.log(`DB connected successfully: ${connected.host}:${connected.port}/${connected.db}`);
  } catch (error) {
    throw new ApiError(500, 'failed to connect to DB', error);
  }
}
