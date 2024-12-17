import { Input } from './ui/input'
import { Button } from './ui/button'
import ChatItem from './ChatItem'
import Scrollbar from 'react-scrollbars-custom'
import { v4 as uuidv4 } from 'uuid';

const chats = [
  {
    profilePic: 'favicon.png',
    name: 'johnasdffffffffffffffffffffffffff',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  }
  , {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  },
  {
    profilePic: 'favicon.png',
    name: 'joh',
    last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
    time: '43'
  }
]

const LeftSection = () => {
  return (
    <>
      <div className='max-h-[500px]'>
        <section className='flex justify-between p-2 m-2 gap-3 '>
          
          <Input />
          <Button>
            add +
          </Button>
        </section>
        <hr />
        <section className='scroll-m-52'>
          {
            chats.map(chat => (
              <ChatItem {...chat} key={uuidv4()} />
            ))
          }
          
        </section>
      </div>
    </>
  )
}

export default LeftSection