import e from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ORIGIN } from './constants';
import { morganMiddleware } from './utils/logger';

import globalErrCatch from './utils/globalErrCatch';
const app = e();

app.use(e.json());
app.use(cookieParser());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(morganMiddleware)
import userRouter from './routes/userRouter'

app.use('/api/v1/user',userRouter)

app.use(globalErrCatch);

export default app;

