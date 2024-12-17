import e from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ORIGIN } from './constants';
import { morganMiddleware } from './utils/logger';
import globalErrCatch from './utils/globalErrCatch';
import { Server } from 'socket.io';
import http from 'http'


const app = e();
const httpServer = http.createServer(app);

const io = new Server(httpServer,{
  pingTimeout: 5000,
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  }
})

app.set('io',io)
console.log(ORIGIN);

app.use(cookieParser());
app.use(e.json()); // recognize incoming req. object as JSON object OR parse `application/json`
app.use(e.urlencoded({ extended: true })); // recognize incoming req. object as strings or arrays OR parse ` application/x-www-form-urlencoded`
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(morganMiddleware);
import userRouter from './routes/userRouter';

app.use('/api/v1/user', userRouter);

app.use(globalErrCatch);

export default httpServer;
