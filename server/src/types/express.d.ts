// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'
import { IUserDocument } from '../models/user.models'


declare global {
  namespace Express {
    interface Request {
      user: IUserDocument
    }
  }
}