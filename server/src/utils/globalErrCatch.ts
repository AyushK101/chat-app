import { NextFunction, Request, Response } from 'express';
import ApiError from './apiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function globalErrCatch(err: ApiError | unknown, req: Request, res: Response, next: NextFunction): void {

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.error,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    return
  } 

  // fallback for unknown errors
  res.status(500).json({
    statusCode: 500,
    error: {
      name: err instanceof Error ? err.name : 'UnknownError',
      message: err instanceof Error ? err.message : 'Something went wrong',
      stack: err instanceof Error && process.env.NODE_ENV === 'development' ? err.stack : undefined,
      // cause: err instanceof Error ? err.cause : undefined,
    },
    globalMsg: 'global error catch',
  });
}
