import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { LoginPage } from './pages'
import { ThemeProvider } from './components/theme-provider.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import ProtectedRoute from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />
  },
  {
    path: '/chat',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <App/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>


  </StrictMode>,
)
