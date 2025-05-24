import { useCreateOneToOneChatMutation } from "@/redux/api/chatApi";
// import {  type RootStore } from "@/redux/store";
// import { setSelectedChatSlice } from "@/redux/store/chatSlice";
// import Loading from "./Loading";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

type userListItemType = {
    picture: string;
    _id: string;
    username: string;
    email: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }

const UserListItem = ({ _id, username, picture, email }: userListItemType ) => {
  const [triggerFn, { data, error} ] = useCreateOneToOneChatMutation();
  // const { chats, selectedChat } = useSelector( (state: RootStore) => state.chatSlice);

  // const dispatch = useAppDispatch()

  const addOneToOneChat = async (userId: string) => {
    await triggerFn({userId});
    if(error) {
      toast.error(`${error}`, {icon: "🔴"})
    }
    console.log(data)
//     const cleanedChat = {
//   _id: data?.data._id,
//   chatName: data?.data.chatName,
//   isGroupChat: data?.data.isGroupChat,
//   users: data?.data.users.map(user => ({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     picture: user.picture,
//   })),
//   createdAt: data?.data.createdAt,
//   updatedAt: data?.data.updatedAt,
// };

  // dispatch(setSelectedChatSlice(cleanedChat));


  }

  // if(isLoading) return <Loading/>
  

  return (
    <>
    <div className='p-2 m-2 bg-slate-800 text-white font-bold rounded-xl max-w-72 overflow-x-auto' onClick={() => addOneToOneChat(_id)}>
      
      <p className='flex gap-2 items-center'><img src={picture} alt={_id} className='rounded-2xl h-12 w-12 '/> {username}</p>
      <p className='text-slate-400'>email: {email}</p>
    </div>
    
    </>
  )
}

export default UserListItem