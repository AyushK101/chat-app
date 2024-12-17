import { ModeToggle } from './toggleTheme'
import Container from './Container'
import { Heart, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { useAppDispatch } from '@/redux/store'
import { logoutUserSlice } from '@/redux/store/userSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  return (
    <Container className=''>
      <div className='px-2 pt-2 mx-2 mt-2 flex justify-between '>
        <img src='/favicon.png' height={50} width={50}/>
        <p className='text-3xl font-mono'>Chatter Box <span className='text-lg'>By ayush <Heart className='inline-block'/></span></p>
        <div className='flex gap-3'>
        <Button onClick={()=> dispatch(logoutUserSlice())}>
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