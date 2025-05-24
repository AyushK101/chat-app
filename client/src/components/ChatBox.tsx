// import React from 'react'

import { useSelector } from "react-redux"
import { useAppDispatch, type RootStore } from '@/redux/store';
import { Button } from "./ui/button";
import { ArrowLeftSquare, File, MoveLeft, Send } from "lucide-react";
import { chatBoxToggleSlice } from "@/redux/store/chatSlice";
import { Input } from "./ui/input";
import FileUploadButton from "./FileUploadButton";
import Loading from "./Loading";

const ChatBox = () => {
  const { _id } = useSelector((state: RootStore) => state.chatSlice.selectedChat)



  const dispatch = useAppDispatch()

  if(_id == "") return <Loading/>

  return (
    <div className="h-fit p-1 m-1 grid grid-rows-10 grid-flow-col gap-1">

      <div className="row-span-1 w-full h-12 bg-slate-500 p-2 rounded-2xl flex " id="header">
        <div className="md:hidden">
          <Button className="bg-white" onClick={() => dispatch(chatBoxToggleSlice())}>
            <MoveLeft className="" />
          </Button>
        </div>
      </div>

      <div id="chat-box-body row-span-8 overflow-y-auto">



        {_id}
      </div>

      <div className="row-span-1 flex gap-2 m-2 p-2 border rounded-xl">
        <FileUploadButton  />
        <Input />
        <Button>
          <Send />
        </Button>
      </div>

    </div>
  )
}

export default ChatBox