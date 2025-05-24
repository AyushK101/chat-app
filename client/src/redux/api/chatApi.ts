import type {  addToGroupChatReturnType, addToGroupChatType, createGroupChatReturnType, createGroupChatType, createMessageReturnType, createMessageType, fetchMessageReturnType, fetchMessagesType, getAllUserChatsReturnType, oneToOneChatReturnType, oneToOneChatType, removeFromGroupReturnType, removeFromGroupType, renameGroupChatReturnType, renameGroupChatType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApi = createApi({
  reducerPath: 'chatApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
    credentials: 'include',
  }),

  tagTypes: ['myChatItems','reFetchOnSent'],
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
    }),

      //! MESSAGE API 
    createMessage: builder.mutation<createMessageReturnType, createMessageType>({
      query: (body) => ({
        url: "/messages/",
        body: body,
        method: "POST",
        invalidatesTags: ["reFetchOnSent"] // providing tag for refetching every time send message 
        // ✅ Mutation invalidates
      }),

    }),

    fetchMessages: builder.query<fetchMessageReturnType, fetchMessagesType>({
      query: ({chatId}) => ({
        url: `/messages/${chatId}`,
        method: 'GET', 
      }),
      providesTags: ['reFetchOnSent'] // query provides
    })

  })
})


export const {
  useGetAllUserChatsQuery,
  useCreateOneToOneChatMutation,
  useCreateGroupChatMutation,
  useCreateMessageMutation,
  useFetchMessagesQuery,
  useLazyFetchMessagesQuery,


  //! remaining
  useAddToGroupChatMutation,
  useRemoveFromGroupMutation,
  useRenameGroupChatMutation


  
  

} = chatApi