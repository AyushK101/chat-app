import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  addChatDialogState: false,
  chatItems: []
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatItems: (state, action) => {
      state.addChatDialogState = true
      state.chatItems = action.payload
    },
    unsetChatItems: (state) => {
      state.addChatDialogState = false
      state.chatItems = []
    }
  }
  
})

export const {setChatItems } = chatSlice.actions

export default chatSlice.reducer