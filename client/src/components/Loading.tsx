import { quantum } from 'ldrs'

quantum.register()

// Default values shown

const Loading = () => {
  return (
    <div className='mx-auto max-w-screen-xl py-64 flex flex-col justify-center items-center p-10'>

      <l-quantum
        size="45"
        speed="1.75"
        color="black"
      ></l-quantum>
    </div>
  )
}

export default Loading