import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "./ui/switch"
import { useState } from "react"
// import { Input } from "./ui/input";
import { useLazyGetAllUsersQuery } from "@/redux/api/chatApi";
import {  UserType } from "@/types";
import { ChatItemsDropDown } from "./ChatItemsDropDown";
import Loading from "./Loading";
import { UserRoundPlus } from "lucide-react";

const AddChatDialog = () => {
  const [isGroup, setGroup] = useState(false);
  const [allUsers, setAllUsers ] = useState<UserType[]>([{
    "_id": "6761f4f7e33b5e4ae7aed72d",
    "username": "algo Senpai",
    "email": "algosenpai9@gmail.com",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocKz-t-KnGbZ9cBvvHcAymScSxaPxQTKfFy_jegn8E01hB2jZA=s96-c",
    "createdAt": "2024-12-17T22:02:31.062Z",
    "updatedAt": "2024-12-17T22:02:31.062Z",
    "__v": 0
},]) ;
  const [getAllUserTrigger, { isSuccess, isLoading}] = useLazyGetAllUsersQuery()

  async function fetchUsers() {
    const response = await getAllUserTrigger(null)
    console.log(response);
    if(response.data?.data) setAllUsers(response.data?.data)
  }

  
  return (
    <div>
      <Dialog >
  <DialogTrigger onClick={()=> fetchUsers()} className="bg-white text-black p-2 mx-1 rounded-lg font-bold flex"><UserRoundPlus /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="p-2 m-2">Create Chat</DialogTitle>
      <DialogDescription>
        <div className="p-2 m-2 ">
           <div><Switch onClick={()=>{
            console.log(isGroup)
            setGroup(prev => !prev)
           }} className="mr-4"/> Group Chat ?
            </div>
           
           {isLoading && <Loading/>}
           {isSuccess && <ChatItemsDropDown allUsers={allUsers} isGroup={isGroup}/> }
        </div>
        
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddChatDialog