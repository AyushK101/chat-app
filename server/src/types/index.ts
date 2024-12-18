import { IUserDocument } from '../models/user.model';

export type jwtPayloadType = {
  _id: string;
  email: string;
};

export interface IUser {
  _id: string;
  username: string;
  email: string;
  picture?: string; // Optional field
  __v: number;
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    _id: string;
    email: string;
  }
}

declare module 'socket.io' {
  export interface Socket {
    user: IUserDocument;
  }
}
