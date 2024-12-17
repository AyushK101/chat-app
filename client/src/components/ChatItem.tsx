import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface chatItemProp {
  profilePic: string,
  name: string
  last: string
  time: string
}

const ChatItem = ({last, name, profilePic, time}:chatItemProp) => {
  return (
    <>
    <div className="p-2 flex justify-between">
      <div className="flex gap-2">
        <Avatar>
      <AvatarImage src={profilePic} alt=""  height={50} width={50} className="border rounded-full z-0" />
      <AvatarFallback>IMG</AvatarFallback>      
        </Avatar>
      <div >
        <h1 className="text-xl font-bold font-mono  text-clip">{name.slice(0,5)}{name.length > 5 ? '...' : ''}</h1>
        <p>{last.slice(0,5)}{last.length > 5 ? '...': ''}</p>
      </div>
      </div>
      <div className="">{time} minutes</div>
    </div>
    <hr />
    </>

  )
}

export default ChatItem