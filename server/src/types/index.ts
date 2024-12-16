export type jwtPayloadType = {
  _id: string,
  email: string
}


export interface IUser {
  _id: string,
  username: string;
  email: string;
  picture?: string; // Optional field
  __v: number

}