import { useCreateGroupChatMutation } from "@/redux/api/chatApi"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useLazySearchUserApiQuery } from "@/redux/api/userApi";

type selectedUsersType = { picture: string; _id: string; username: string; email: string; __v: number; createdAt: string; updatedAt: string; }[]

const GroupChatModel = ({ className }: { className: string }) => {
  const [groupName, setGroupName] = useState("");
  const [names, setNames] = useState([]);
  const [searchName, setSearchName] = useState("");
  // const [searchUsersResult, setSearchUsersResult ] = useState([]);
  const [triggerFn, { error, isError }] = useCreateGroupChatMutation();
  const [selectedUsers, setSelectedUsers] = useState<selectedUsersType[]>([]);

  const [triggerFnSearch, { data: searchUserResultData }] = useLazySearchUserApiQuery();




  const createGroupFn = async () => {

    await triggerFn({ groupName, names: JSON.stringify(names) })
    if (isError)
      toast.error(`${error?.data?.message}`, { icon: "🔴" })
  }

  const [debouncedSearchName, setDebouncedSearchName] = useState('');


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(searchName);
    }, 500); // wait 500ms

    return () => {
      clearTimeout(handler); // cancel the timeout if the value changes
    };
  }, [searchName]);

  useEffect(() => {
    const search = async () => {
      if (debouncedSearchName.trim().length >= 1) {
        await triggerFnSearch(debouncedSearchName);
        // setSearchUsersResult(searchUserResultData?.data);
      }
    };
    search();
  }, [debouncedSearchName, searchUserResultData?.data, triggerFnSearch]);

  return (
    <div className={`${className} w-sm max-h-96  rounded-xl border bg-slate-200 flex flex-col items-center p-2 m-2`}>
      <p className="text-3xl font-bold">Create Group Chat</p>
      <Input onChange={(e) => setGroupName(e.target.value)} placeholder="enter group name" className="p-2 m-2" />
      <Input onChange={(e) => {
        setSearchName(e.target.value)
      }} placeholder="search Users" className="p-2" />
      <p className="text-sm flex flex-wrap gap-1 text-green-500 m-2 items-center h-fit min-h-20 overflow-y-scroll">Selected:
        {selectedUsers?.map(user => (
          <div key={user._id} className="bg-slate-300 p-1 rounded" >
            {user.username}
          </div>
        ))}
      </p>
      <p className="text-sm flex flex-wrap gap-1 text-red-500 items-center h-fit overflow-auto">Searched:
        {
          searchUserResultData?.data?.map(user => (
            <div onClick={() => {
              setSelectedUsers(prev => {
                const exists = prev.some(u => u._id === user._id); // assumes user object has _id
                return exists ? prev : [user, ...prev];
              });

              setNames(prev => {
                return prev.includes(user._id) ? prev : [user._id, ...prev];
              });

            }} className="bg-slate-300 p-1 rounded" >
              {user.username}
            </div>
          ))
        }
      </p>
      <Button onClick={createGroupFn} className="m-2 bg-black text-white ">
        create group
      </Button>
    </div>

  )
}

export default GroupChatModel