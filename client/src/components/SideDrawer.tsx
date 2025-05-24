import React, { useState } from 'react'
import { Button } from './ui/button'
import { Plus, Search } from 'lucide-react';
import Container from './Container';
import { Input } from './ui/input';
import { useLazySearchUserApiQuery } from '@/redux/api/userApi';
import Loading from './Loading';
import toast from 'react-hot-toast';
import UserListItem from './UserListItem';
import GroupChatModel from './GroupChatModel';

const SideDrawer = () => {
  const [triggerFn, { data: searchResult }] =  useLazySearchUserApiQuery();
  const [search, setSearch ]  = useState("");
  const [loading, setLoading ] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [groupChatToggle, setGroupChatToggle ] = useState(true);
  
  const toggleDrawer = () => {
    setToggle((toggle) => !toggle);


  }

  const handleSearch = async ( ) => {
    if(!search) {
      toast.error('please enter something ',{icon: "🔴"})
      return
    }
    setLoading(true);
    
    await triggerFn(search);
    setLoading(false);
    toast.success(`${search}'s users provided `,{icon: "🟢"})
  }


  

  return (
    <Container className='px-6 flex gap-2 flex-wrap'>
      <GroupChatModel className={`${groupChatToggle? 'hidden' : '' } absolute top-48 left-48`} />
      <div className={`rounded-2xl p-2 m-2 bg-slate-600 h-fit overflow-y-scroll max-h-96 max-w-2xl min-w-2xs absolute z-3 ${toggle ? 'hidden' : ''}`} id='drawer'>
        <Input className='bg-gray-300 border-gray-500' onChange={(e)=>{
          setSearch(e.target.value);
        }}/>
        <div className='flex justify-center items-center gap-3 mt-2'>
          <Button className='bg-black text-white' onClick={handleSearch}>
          <Search/>
        </Button>
        <Button onClick={toggleDrawer}className='bg-black text-white'>close</Button>
        </div>
        <div className='flex flex-col'>
          {
            loading ? <Loading /> :  searchResult?.data?.map( item => (
              <div key={item._id}>
                <UserListItem {...item}  />
              </div>
            ))
          }
        </div>
      </div>


      <Button onClick={toggleDrawer}>
        <Search/> Search User
      </Button>

        <Button onClick={() => setGroupChatToggle((state) => !state)} >
        <Plus/> create group chat
      </Button>
    </Container>
  )
}

export default SideDrawer