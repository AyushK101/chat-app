import {  getCurrentUserType, registerApiType } from '@/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    loginUserApi: builder.mutation<registerApiType,{credentials: string}>({
      query: (data: {credentials: string}) => ({
        url: "/user/signup",
        body: data,
        method: 'POST',
      })
    }),
    logoutUserApi: builder.query({
      query: () => ({
        url: "/user/logout",
        method: 'GET',
      })
    }),
    getUserApi: builder.query<getCurrentUserType,null>({
      query: () => ({
        url: '/user/get',
        method: 'GET'
      })
    })
    })



})

export const  {
  useLoginUserApiMutation,
  useGetUserApiQuery,
  useLazyLogoutUserApiQuery
} = userApi