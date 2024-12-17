import { UserSliceType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {authStatus: boolean, user: UserSliceType | null} = {
  authStatus: false,
  user: {
    username: "ayush",
    email: "socialacc211@gmail.com",
    picture: "/favicon.png"
  }
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loginUserSlice: (state, action) => {
      state = action.payload
    },
    logoutUserSlice: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = {authStatus: false, user: null}
    }
  }
})

export const {loginUserSlice, logoutUserSlice } = userSlice.actions

export type loginUserSliceType  = typeof userSlice.actions.loginUserSlice
export type logoutUserSliceType  = typeof userSlice.actions.logoutUserSlice


export default userSlice.reducer



