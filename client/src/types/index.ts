export type LoginType = {
  statusCode: number
  message: string
  data: {
    username: string
    email: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export type UserSliceType = {
  username: string,
  email: string,
  picture: string
}


export type LoginErrorType = {
  data: {
    statusCode: number,
    message: string,
    stack: string
  },
  status: number
}

export type registerApiType =  {
  statusCode: number
  message: string
  data: {
    _id: string
    username: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  success: boolean
}