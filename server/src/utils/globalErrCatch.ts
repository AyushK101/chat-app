import { Request, Response } from 'express';
import ApiError from './apiError';

export default function globalErrCatch(err: Error, req: Request, res: Response): void {
  if (err instanceof ApiError) {
    res.status(err?.statusCode || 500).json({
      statuscode: err.statusCode ?? 500,
      message: err.message ?? undefined,
      error: err.error ?? undefined,
      stack: err.stack ?? undefined,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      error: err,
      globalMsg: 'global error caught',
    });
  }
}
