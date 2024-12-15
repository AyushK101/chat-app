import e from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ORIGIN } from './constants';
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

app.use(globalErrCatch);

export default app;
