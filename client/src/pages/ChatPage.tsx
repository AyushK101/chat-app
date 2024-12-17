import { Container, LeftSection, RightSection } from '@/components'

const ChatPage = () => {
  return (
    <Container className=''>
    <div className='grid grid-cols-12 min-h-[532px]  p-2 m-2'>
      <div className='col-span-4 border rounded-lg overflow-y-scroll '>
      <section className='col-span-4'>
        <LeftSection/>
      </section>
      </div>
      <section className='col-span-8  border rounded-lg'>
        <RightSection/>
      </section>
    </div>

    </Container>
  )
}

export default ChatPage