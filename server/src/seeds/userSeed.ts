import { User } from '../models/user.model';
import connectDb from '../db/db';
import userSeed from './userSeed.json';
import { MONGO_URI } from '../constants';
import logger from '../utils/logger';

const seedUsers = async () => {
  try {
    await connectDb(MONGO_URI);
    await User.deleteMany();
    await User.insertMany(userSeed);
    logger.info(`user seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    logger.error(`error in user seeding`);
  }
};

seedUsers();
