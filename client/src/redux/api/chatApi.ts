import type {  addToGroupChatReturnType, addToGroupChatType, createGroupChatReturnType, createGroupChatType, getAllUserChatsReturnType, oneToOneChatReturnType, oneToOneChatType, removeFromGroupReturnType, removeFromGroupType, renameGroupChatReturnType, renameGroupChatType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApi = createApi({
  reducerPath: 'chatApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
    credentials: 'include',
  }),

  tagTypes: ['myChatItems'],
  endpoints: (builder) => ({

    // fetchChat : get user's all chats
    getAllUserChats: builder.query<getAllUserChatsReturnType, null>({
      query: () => ({
        url: '/chats/',
        method: 'GET',
        cache: 'no-cache'
      }),
      providesTags: ['myChatItems']
    }),
    
    createOneToOneChat: builder.mutation<oneToOneChatReturnType, oneToOneChatType, oneToOneChatReturnType>({
      query: (body)=> ({
        method: 'POST',
        body: body,
        url: `/chats/`,
      }),
      invalidatesTags: ['myChatItems']
    }),

    createGroupChat: builder.mutation<createGroupChatReturnType, createGroupChatType>({
      query: (body) => ({
        url: `/chats/group`,
        body: body,
        method: 'POST',
      }),
      invalidatesTags: ['myChatItems']
    }),

    renameGroupChat: builder.mutation<renameGroupChatReturnType, renameGroupChatType>({
      query: (body) => ({
        url: `/chats/group`,
        body: body,
        method: 'PUT'
      }),
      invalidatesTags: ['myChatItems']
    }),

    addToGroupChat: builder.mutation<addToGroupChatReturnType, addToGroupChatType>({
      query: (body) => ({
        url: '/chats/add',
        body: body,
        method: 'PUT'
      }),
      invalidatesTags: ['myChatItems']
    }),

    removeFromGroup: builder.mutation<removeFromGroupReturnType, removeFromGroupType>({
      query: (body) => ({
        url: '/chats/groupremove',
        body: body,
        method: 'PUT'
      }),
      invalidatesTags: ['myChatItems']
    })
  }),


})


export const {
  useGetAllUserChatsQuery,
  useCreateOneToOneChatMutation,
  useCreateGroupChatMutation,

  
  

} = chatApi