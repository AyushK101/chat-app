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
    </Container>
    <Container className='flex justify-center max-h-[504px] p-2 m-2'>
      <div className={`overflow-y-auto border w-full  rounded-lg mx-2  md:block ${chatBoxToggle ? 'hidden' : ''}`}>
      <section className='col-span-4'>
        {<MyChats/>}
      </section>
      </div>
      <section className={`border rounded-lg mx-2 w-full md:min-w-2xl  md:block  ${chatBoxToggle ? '' : 'hidden'}`}>
        {<ChatBox/>}
      </section>

    </Container>
    

    </>
  )
}

export default ChatPage