// import { useSelector } from "react-redux"
import Header from "./components/Header"
import { ChatPage } from "./pages"
// import { RootStore } from "./redux/store"
// import AddChatDialog from "./components/AddChatDialog"


function App() {
  // console.log('inside app')
  // const addChatDialogState = useSelector( (state: RootStore) => state.chatSlice.addChatDialogState)

  return (
    <>
      {/* <Container className=""> */}
         <Header/>
      <ChatPage/>
      {/* </Container> */}
    </>
  )
}

export default App
