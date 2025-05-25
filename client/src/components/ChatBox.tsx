// import React from 'react'

import { useSelector } from "react-redux"
import { useAppDispatch, type RootStore } from '@/redux/store';
import { Button } from "./ui/button";
import { MoveLeft, Send } from "lucide-react";
import { chatBoxToggleSlice } from "@/redux/store/chatSlice";
import { Input } from "./ui/input";
import Loading from "./Loading";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCreateMessageMutation, useFetchMessagesQuery, useLazyFetchMessagesQuery } from "@/redux/api/chatApi";
import type { messageType } from "@/types";
import socket, { connectSocket } from "@/socket/socket";
// import Lottie from 'react-lottie';
// import animationData from '../animations/typing.json';
import Typing from "./Typing";


  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };


const ChatBox = () => {
  const { _id: chatId } = useSelector((state: RootStore) => state.chatSlice.selectedChat)
  const [mess, setMess] = useState("");
  const [triggerFn] = useCreateMessageMutation();
  const [fetchTrigger, { error: fetchError }] = useLazyFetchMessagesQuery();
  const [allMes, setAllMes] = useState<messageType[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  // const [selectedChatIdCompare, setSelectedChatIdCompare] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [typing, setTyping] = useState(false);


  const { data: fetchedMess } = useFetchMessagesQuery({ chatId }, { skip: !chatId }); // eager query


  const { user } = useSelector((state: RootStore) => state.userSlice)
  const userId = user?._id


  // create socket connection + setup(every user's own room event)
  useEffect(() => {
    connectSocket();
    socket.emit("setup", user);
    const connectionFn = () => {
      setSocketConnected(true);
    }
    socket.on('connection', connectionFn)
    return () => {
      socket.disconnect()
      socket.off('connection', connectionFn)
    }
  }, [user])

  // fetch all chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      try {
        const result = await fetchTrigger({ chatId }).unwrap();
        setAllMes(result.data);
      } catch (err: unknown) {
        console.error(err);
        toast.error(JSON.stringify?.(err), { icon: "🔴" });
      }
    }
    fetchMessages()
    return () => {

    }
  }, [chatId, fetchError, fetchTrigger, fetchedMess])

  // join different room when chatId changes
  useEffect(() => {
    if (chatId || socketConnected)
      socket.emit('join_chat', chatId);
    // setSelectedChatIdCompare(chatId);
  }, [chatId, socketConnected])

  // dummy for debug
  // useEffect(() => {
  //   console.log("All messages updated", allMes);
  // }, [allMes]);

  // update on message_received event
  useEffect(() => {
    const handleNewMessage = (newMessage: messageType) => {
      if (!newMessage?.chatId?._id) return;

      // Check if this message belongs to the current chat
      if (newMessage.chatId._id === chatId) {
        setAllMes(prev => [...prev, newMessage]);  // ✅ append at end (most recent last)
      } else {
        console.log('Message for another chat, show notification maybe');
      }
    };

    socket.on('message_received', handleNewMessage);

    return () => {
      socket.off('message_received', handleNewMessage);
    };
  }, [chatId]);

  //ref to scroll to down on update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMes])

  // typing event
  useEffect(() => {
    let id: NodeJS.Timeout;

    const handleTyping = (typingChatId: string) => {
      if (chatId === typingChatId) {
        setTyping(true);
        clearTimeout(id); // clear previous timeout if user is still typing
        id = setTimeout(() => setTyping(false), 2000);
      }
    };

    socket.on('set_typing', handleTyping);

    return () => {
      clearTimeout(id);
      socket.off('set_typing', handleTyping); // important to pass same function reference
    };
  }, [chatId]); // re-attach only if chatId changes



  const dispatch = useAppDispatch()

  // create message and send new_message event
  const sendMessage = async () => {
    try {
      if (mess.length < 1) {
        toast.error("enter something", { icon: "🔴" });
        return;
      }

      const newMessageData = await triggerFn({ chatId, content: mess }).unwrap();  // ✅ unwrap returns actual data
      console.log(newMessageData);

      socket.emit('new_message', newMessageData.data);
      setMess("");
    } catch (err: unknown) {
      console.error("Message send failed", err);
      toast.error(JSON.stringify(err), { icon: "🔴" });
    }
  }


  if (chatId == "") return <Loading />

  return (
    <div className="h-full p-1 m-1 flex flex-col gap-2">

      <div className="w-full min-h-12 bg-slate-500 p-2 rounded-2xl flex " id="header">
        <div className="md:hidden">
          <Button className="bg-white" onClick={() => dispatch(chatBoxToggleSlice())}>
            <MoveLeft className="" />
          </Button>
        </div>
      </div>

      <div id="chat-box-body" className="flex-1 overflow-y-auto flex  flex-col ">
        { // ${ mess.senderId._id == userId ? 'bg-green-200 justify-end' : ''} 
          (allMes ?? []).map(mess => {
            // console.log(mess.senderId._id == userId)
            // console.log({_id: mess, userId})

            return (
              <div key={mess._id} className={`w-full flex ${mess.senderId._id == userId ? ' justify-end' : 'justify-right'} `}>
                <div className={`flex p-1 m-1 rounded-xl max-w-[70%] break-words whitespace-pre-wrap  ${mess.senderId._id == userId ? 'bg-green-200 ' : 'bg-blue-200 '} `}>
                  {
                    <>
                      <h6 className="font-serif italic ">{mess?.senderId?.username} :-</h6>
                      <h1 className="overflow-hidden">{mess?.content}</h1>
                    </>

                  }
                </div>
              </div>
            )
          })
        }

        {/* {typing ? <Lottie width={70} style={{marginBottom: 15, marginTop: 0, color: "black", accentColor: "black"}} options={defaultOptions}/> : ''} */}
        { typing? <Typing/> : null} 
        {/* {userId} */}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 m-2 p-2 border rounded-xl">
        {/* <FileUploadButton  /> */}
        <Input onChange={(e) => {
          setMess(e.target.value)
          socket.emit('typing', chatId)
        }} value={mess} />
        <Button onClick={sendMessage}>
          <Send />
        </Button>
      </div>

    </div>
  )
}

export default ChatBox