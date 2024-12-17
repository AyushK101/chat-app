import { Paperclip, SendHorizontal } from 'lucide-react'
import { Input } from './ui/input'
import ChatItem from './ChatItem'

const MessageBlock = () => {
  return (
    <>
      <div className='flex flex-col w-full h-full justify-between'>
        <section>
          <ChatItem {...  {
            profilePic: 'favicon.png',
            name: 'joh',
            last: "hiasdffffffffffffffffffffffffffffffffffffffffffffff",
            time: '43'
          }} />
        </section>
        <section className='overflow-y-scroll max-h-[370px]'>
         </section>
        <section className='flex justify-between gap-4 p-2 m-2 items-center '>
          <div >
            <label htmlFor='file-input'>
              <Paperclip size={40}/>
            </label>
          <Input type='file' id='file-input' className='hidden' />
          </div>
          <Input />
          <button><SendHorizontal size={40} /></button>
        </section>

      </div>
    </>
  )
}

export default MessageBlock