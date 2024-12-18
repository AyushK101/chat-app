import { ModeToggle } from './toggleTheme'
import Container from './Container'
import { Heart, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { RootStore, useAppDispatch } from '@/redux/store'
import { logoutUserSlice } from '@/redux/store/userSlice'
import { useSelector } from 'react-redux'
import { useLazyLogoutUserApiQuery } from '@/redux/api/userApi'
import { useNavigate } from 'react-router'
import Loading from './Loading'

const Header = () => {
  const dispatch = useAppDispatch()
  const user = useSelector( (state: RootStore)=> state.userSlice.user)
  const [logoutTrigger,{ isLoading }] = useLazyLogoutUserApiQuery();
  const navigate = useNavigate();
  
   async function redirectLogout() {
    await logoutTrigger(null)
    navigate('/login')
   }

  if(isLoading) return <Loading/>

  return (
    <Container className=''>
      <div className='px-2 pt-2 mx-2 mt-2 flex justify-between items-center '>
        <img src='/favicon.png' height={50} width={50}/>
        <p className='text-3xl font-mono '>Chatter Box <span className='text-lg'>By ayush <Heart className='inline-block'/></span></p>
        <div className='flex gap-3 items-center'>
          <img src={user?.picture} alt="user-img" height={40} width={40} className='rounded-full '/>
          {user?.username}
        <Button onClick={()=> {
          dispatch(logoutUserSlice())
          redirectLogout()
        }}>
            logout
          </Button>
        <ModeToggle/>
        <Button className='p-[.70rem]'>
          <Settings  />
        </Button>
        </div>
      </div>
    </Container>
  )
}

export default Header