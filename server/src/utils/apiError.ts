export type ApiErrorType = {
  statusCode: number;
  message: string;
  error?: {
    message: string;
    name: string;
    stack?: string;
  } | null | unknown;
  stack?: string;
};

export default class ApiError extends Error implements ApiErrorType {

  constructor(
    public statusCode: number,
    public message: string,
    public error?: ApiErrorType['error'] | unknown,
    public stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;


    if(error instanceof Error) {
      this.error =  {
         message: error?.message,
         name: error?.name,
         stack: error?.stack,
       }
    } else {
      this.error = null;
    }
     

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
