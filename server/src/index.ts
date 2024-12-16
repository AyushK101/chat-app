import { MONGO_URI, PORT } from './constants';
import connectDb from './db/db';
import app from './app';
(async () => await connectDb(MONGO_URI).then(
  () => {
    app.listen(PORT,()=>{
      console.log(`server started on port: ${PORT}`);
    })
  }
))();


