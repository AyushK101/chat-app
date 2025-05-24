import { useAppDispatch } from "@/redux/store";
import { chatBoxToggleSlice, setSelectedChatSlice } from "@/redux/store/chatSlice";



type MyChatItemType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: Array<{
    _id: string;
    username: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MyChatItem = ({ isGroupChat, _id, chatName, users, }: MyChatItemType) => {

  const dispatch = useAppDispatch();
  return (
    <div className='p-2 m-2 bg-slate-800 max-h-30 text-white font-bold rounded-xl  overflow-x-auto' onClick={() => {
      dispatch(setSelectedChatSlice({_id}))
      dispatch(chatBoxToggleSlice())
    }}>
      <p>{isGroupChat ? `GroupName: ${chatName}` : ""}</p>
      <p className='flex gap-2 items-center'><img src={users[1].picture} alt={_id} className='rounded-2xl h-12 w-12 ' /> {users[1].username}</p>
      <p className='text-slate-400 text-shadow-sm text-sm'>last message </p>

    </div>
  )
}

export default MyChatItem