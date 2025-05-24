// import React from 'react'

import { useGetAllUserChatsQuery } from "@/redux/api/chatApi"
import type { RootStore } from "@/redux/store"
import { useSelector } from "react-redux"
import Loading from "./Loading";
import MyChatItem from "./MyChatItem";

const MyChats = () => {
  const  {isLoading, data: userChats, error } = useGetAllUserChatsQuery(null);
  const { chats, selectedChat } = useSelector( (state: RootStore) => state.chatSlice)
  return (
    <div className="max-h-dvh overflow-auto">
      {isLoading ? <Loading/> : (
        userChats?.data.map( (item) => (
          <div key={item._id}>
            <MyChatItem {...item} /> 
          </div>
        ))
      )}

    </div>
  )
}

export default MyChats