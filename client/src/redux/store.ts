import { configureStore } from "@reduxjs/toolkit";
import userReducer from './store/userSlice'
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [userApi.reducerPath]: userApi.reducer
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(userApi.middleware)
  )
})


setupListeners(store.dispatch)  

export type RootStore = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
