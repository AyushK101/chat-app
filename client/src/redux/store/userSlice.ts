import type { UserSliceType } from "@/types";
import { createSlice,} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
    loginUserSlice: (state, action: PayloadAction<{authStatus: boolean, user: UserSliceType}>) => {
      // console.log('in loginUserSlice',action.payload,action.type)
      // state = {authStatus: true, user: action.payload.user}
      state.authStatus = true
      state.user = action.payload.user
    },
    logoutUserSlice: (state) => {
       
      // state = {authStatus: false, user: null}
      state.authStatus = false
      state.user = null
    }
  }
})

export const {loginUserSlice, logoutUserSlice } = userSlice.actions

export type loginUserSliceType  = typeof userSlice.actions.loginUserSlice
export type logoutUserSliceType  = typeof userSlice.actions.logoutUserSlice


export default userSlice.reducer



