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
    picture: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  success: boolean
}

export type getCurrentUserType = {
  statusCode: number
  message: string
  data: {
    _id: string
    username: string
    picture: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}
export type getAllUserTypes = {
  statusCode: number
  message: string
  data: Array<{
    _id: string
    username: string
    email: string
    __v: number
    createdAt: string
    updatedAt: string
    picture?: string
  }>
}


export type UserType = {
  _id: string
    username: string
    email: string
    __v: number
    createdAt: string
    updatedAt: string
    picture?: string
}

export  type  createRouteType = {
  isGroup: boolean,
  groupParticipants: [UserType] | null
  groupName: string,
  oneToOneUser: UserType
}