import { Input } from './ui/input'
// import { Button } from './ui/button'
import ChatItem from './ChatItem'
import { v4 as uuidv4 } from 'uuid';
// import { useAppDispatch } from '@/redux/store';
// import { setChatItems } from '@/redux/store/chatSlice';
import AddChatDialog from './AddChatDialog';
import Typing from './Typing';

// const chats = [
//   {
//     profilePic: 'favicon.png',
//     name: 'johnasdffffffffffffffffffffffffff',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   }
//   , {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   },
//   {
//     profilePic: 'favicon.png',
//     name: 'joh',
//     last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
//     time: '43'
//   }
// ]

const LeftSection = ({chats=[]}: {chats: {profilePic: string, name: string, last: string ,time: string}[]}) => {


  return (
    <>
      <div className='max-h-[500px]'>
        <section className='flex justify-between p-2 m-2 gap-3 '>
          
          <Input />
          {/* <Button onClick={()=>{
            addChatClick()
          }}>
            + add chat
          </Button> */}
          <AddChatDialog/>
          
        </section>
        <hr />
        <section className='scroll-m-52'>
          {
            chats.length > 1 && chats?.map(chat => (
              <ChatItem {...chat} key={uuidv4()} />
            ))
          }
          
        </section>
      </div>
    </>
  )
}

export default LeftSection