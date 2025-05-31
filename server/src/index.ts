import dotenv from 'dotenv';
dotenv.config();
import connectDb from './db/db';
import http from 'http';
import 'colors';
import app from './app';
export const httpServer = http.createServer(app);
import socketInit from './lib/socket';

async function main () {
  await connectDb(process.env.MONGO_URI || '').then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`server started on port: ${process.env.PORT}`.yellow);
    });
  });
  await socketInit()
}
main();