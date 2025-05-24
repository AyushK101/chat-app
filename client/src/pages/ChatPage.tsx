import { ChatBox, Container, MyChats, SideDrawer } from '@/components'
import type { RootStore } from '@/redux/store'
// import { useGetAllUserChatsQuery } from '@/redux/api/chatApi'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const ChatPage = () => {
  // const { data } = useGetAllUserChatsQuery(null);
  const chatBoxToggle = useSelector( (state: RootStore) => state.chatSlice.chatBoxToggle)
   
  useEffect( ()=>{

  },[])
  // console.log('isSuccess',isSuccess);
  
  return (
    <>
    <Container className=''>
          <SideDrawer/>

    <div className='grid grid-cols-12 min-h-[532px]  p-2 m-2 border-white '>
      <div className={`col-span-12 md:col-span-4 border rounded-lg mx-2  md:block ${chatBoxToggle ? 'hidden' : ''}`}>
      <section className='col-span-4'>
        {<MyChats/>}
      </section>
      </div>
      <section className={`col-span-12 md:col-span-8  border rounded-lg md:block  ${chatBoxToggle ? '' : 'hidden'}`}>
        {<ChatBox/>}
      </section>
    </div>
    </Container>
    

    </>
  )
}

export default ChatPage