import connectDb from './db/db';
// import httpServer from './app';
import { httpServer } from './lib/socket';
import 'colors';
import dotenv from 'dotenv';
dotenv.config();


(async () => await connectDb(process.env.MONGO_URI || "").then(
  () => {
    httpServer.listen(process.env.PORT,()=>{
      console.log(`server started on port: ${process.env.PORT}`.yellow);
    })
  }
))();



