import { RootStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router"
import { useGetUserApiQuery } from '@/redux/api/userApi'
import { useAppDispatch } from '@/redux/store'
import { loginUserSlice } from '@/redux/store/userSlice'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from "./Loading"

const ProtectedRoute = () => {
  const authStatus = useSelector( (state: RootStore) => state.userSlice.authStatus )
  const {isSuccess,isError, data,isLoading} = useGetUserApiQuery(null,{
    skip: authStatus,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // console.log({isSuccess,isError,error,data,isLoading})
  useEffect( ()=> {
    if(isSuccess) {
      toast.success(`${data?.message}`,{icon: "🟢"})
      dispatch(loginUserSlice({user: data?.data, authStatus: true}))
      navigate('/')
    }
    if(isError) {
      toast.error(`error while fetching`,{icon: "🔴"})
    }
  },[data?.data, data?.message, dispatch, isError, isSuccess, navigate])

  if(isLoading) return <Loading/>
  // console.log('authStatus',authStatus,isSuccess)
  if(!isSuccess && !authStatus) return <Navigate to={'/login'}/>
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoute