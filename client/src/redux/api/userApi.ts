import type {  getCurrentUserType, registerApiType, searchUserApiReturnType } from '@/types'
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
        url: "/users/signup",
        body: data,
        method: 'POST',
      })
    }),

    logoutUserApi: builder.query({
      query: () => ({
        url: "/users/logout",
        method: 'GET',
      })
    }),

    getUserApi: builder.query<getCurrentUserType,null>({
      query: () => ({
        url: '/users/get',
        method: 'GET'
      })
    }),

    searchUserApi: builder.query<searchUserApiReturnType, string>({
      query: (search) => ({
        url: `/users/?search=${search}`,
        method: 'GET',
        
      })
    })


    })
})

export const  {
  useLoginUserApiMutation,
  useGetUserApiQuery,
  useLazyLogoutUserApiQuery,
  useSearchUserApiQuery,
  useLazySearchUserApiQuery
} = userApi