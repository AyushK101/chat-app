import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type selectedChatType = { _id: string }

const initialState: { chats: [], selectedChat: selectedChatType, chatBoxToggle: boolean} = {
  chats: [],
  selectedChat: {_id: ""},
  chatBoxToggle: false
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatItemsSlice: (state, action) => {
      state.chats = action.payload
    },

    unsetChatItemsSlice: (state) => {
      state.chats = []
    },

    setSelectedChatSlice: (state, action: PayloadAction<{_id: string}>) => {
      state.selectedChat = action.payload
    },

    chatBoxToggleSlice: (state) => {
      state.chatBoxToggle = !state.chatBoxToggle;
    }

  }
  
})

export const {setChatItemsSlice, unsetChatItemsSlice, setSelectedChatSlice, chatBoxToggleSlice } = chatSlice.actions

export type setChatItemsSliceType = typeof chatSlice.actions.setChatItemsSlice
export type unsetChatItemsSliceType = typeof chatSlice.actions.unsetChatItemsSlice
export type setSelectedChatSliceType = typeof chatSlice.actions.setSelectedChatSlice
export type chatBoxToggleSliceType = typeof chatSlice.actions.chatBoxToggleSlice

export default chatSlice.reducer