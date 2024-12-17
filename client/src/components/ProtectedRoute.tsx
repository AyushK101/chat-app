import { RootStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const ProtectedRoute = () => {
  const authStatus = useSelector( (state: RootStore) => state.userSlice.authStatus )
  if(!authStatus) return <Navigate to={'/'}/>
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoute