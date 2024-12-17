import {  registerApiType } from '@/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
    credentials: 'include',
  }),
  tagTypes: [''],
  endpoints: (builder) => ({
    loginUserApi: builder.mutation<registerApiType,{credentials: string}>({
      query: (data: {credentials: string}) => ({
        url: "/user/signup",
        body: data,
        method: 'POST',
      })
    })
  })


})

export const  {
  useLoginUserApiMutation
} = userApi