import {  getAllUserTypes } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllUserChats: builder.query({
      query: () => ({
        url: '/chats/',
        method: 'GET',
        cache: 'no-cache'
      })
    }),
    getAllUsers: builder.query<getAllUserTypes,null>({
      query: ()=>({
        url: "/chats/users",
        method: 'GET',
        cache: 'no-cache'
      })
    }),
    // createRoom: builder.mutation<,createRouteType>({
    //   query: (data)=> ({
    //     url: `chats/c/${data.oneToOneUser._id}`,

    //   })
    // })
  }),

})


export const {
  useGetAllUserChatsQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery
} = chatApi