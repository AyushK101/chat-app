export type LoginType = {
  statusCode: number;
  message: string;
  data: {
    username: string;
    email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type UserSliceType = {
  _id: string;
  username: string;
  email: string;
  picture: string;
};

export type LoginErrorType = {
  data: {
    statusCode: number;
    message: string;
    stack: string;
  };
  status: number;
};

export type registerApiType = {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  success: boolean;
};

export type getCurrentUserType = {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    username: string;
    picture: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
export type getAllUserTypes = {
  statusCode: number;
  message: string;
  data: Array<{
    _id: string;
    username: string;
    email: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    picture?: string;
  }>;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  picture?: string;
};

export type searchUserApiReturnType = {
  data: {
    picture: string;
    _id: string;
    username: string;
    email: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }[];
  message: string;
  statuscode: number;
};

// chat api

export type getAllUserChatsReturnType = {
  statusCode: number
  message: string
  data: Array<{
    _id: string
    chatName: string
    isGroupChat: boolean
    users: Array<{
      _id: string
      username: string
      email: string
      picture: string
      createdAt: string
      updatedAt: string
      __v: number
    }>
    createdAt: string
    updatedAt: string
    __v: number
  }>
}


export type oneToOneChatType = {
  userId: string;
};

export type oneToOneChatReturnType = {
  statusCode: number;
  message: string;
  data:  {
  _id: string
  chatName: string
  isGroupChat: boolean
  users: Array<{
    _id: string
    username: string
    email: string
    picture: string
    createdAt: string
    updatedAt: string
    __v: number
  }>
  createdAt: string
  updatedAt: string
  __v: number
} | string | unknown;
};

export type createGroupChatType = {
  groupName: string;
  names: string[];
};

export type createGroupChatReturnType = {
  statusCode: number;
  message: string;
  data: object | string | unknown;
};

export type renameGroupChatType = {
  chatId: string;
  chatName: string;
};

export type renameGroupChatReturnType = {
  statusCode: number;
  message: string;
  data: object | string | unknown;
};

export type addToGroupChatType = {
  chatId: string;
  userId: string;
};

export type addToGroupChatReturnType = {
  statusCode: number;
  message: string;
  data: object | string | unknown;
};

export type removeFromGroupType = {
  chatId: string;
  userId: string;
};

export type removeFromGroupReturnType = {
  statusCode: number;
  message: string;
  data: object | string | unknown;
};


export type createMessageType = {
  chatId: string
  content: string
}

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

export type fetchMessagesType = {
  chatId: string
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

export type fetchMessageReturnType = {
  statusCode: number
  message: string
  data: messageType[]
}