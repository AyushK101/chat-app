import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { LoginPage } from './pages'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'
import ProtectedRoute from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <ProtectedRoute/>,
    children: [
      {
        path: '/',
        element: <App/>
      }
    ]
  },{
    path: "/login",
    element: <LoginPage/>
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
          <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ReduxProvider>


   </StrictMode>,
)
