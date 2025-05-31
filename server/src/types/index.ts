// import { IUserDocument } from '../models/user.model';

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

// declare module 'socket.io' {
//   export interface Socket {
//     user: IUserDocument;
//   }
// }

export type createMessageReturnType = {
  statusCode: number
  message: string
  data: {
    _id: string
    content: string
    chatId: {
      _id: string
      chatName: string
      isGroupChat: boolean
      users: Array<{
        _id: string
        username: string
        email: string
        picture: string
      }>
      groupAdmin: string
      createdAt: string
      updatedAt: string
      __v: number
      latestMessage: string
    }
    senderId: {
      _id: string
      username: string
      email: string
      picture: string
      createdAt: string
      updatedAt: string
      __v: number
    }
    createdAt: string
    updatedAt: string
    __v: number
  }
}


export type messageType =  {
    _id: string
    content: string
    chatId: {
      _id: string
      chatName: string
      isGroupChat: boolean
      users: Array<string>
      groupAdmin: string
      createdAt: string
      updatedAt: string
      __v: number
      latestMessage: string
    }
    senderId: {
      _id: string
      username: string
      email: string
      picture: string
      createdAt: string
      updatedAt: string
      __v: number
    }
    createdAt: string
    updatedAt: string
    __v: number
  }