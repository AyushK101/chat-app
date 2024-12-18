import { configureStore } from "@reduxjs/toolkit";
import userReducer from './store/userSlice'
import { userApi } from "./api/userApi";
import { chatApi } from "./api/chatApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import chatReducer from "./store/chatSlice";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    chatSlice: chatReducer
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(userApi.middleware).concat(chatApi.middleware)
  )
})


setupListeners(store.dispatch)  

export type RootStore = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
