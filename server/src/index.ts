import { MONGO_URI, PORT } from './constants';
import connectDb from './db/db';
import httpServer from './app';


(async () => await connectDb(MONGO_URI).then(
  () => {
    httpServer.listen(PORT,()=>{
      console.log(`server started on port: ${PORT}`);
    })
  }
))();



