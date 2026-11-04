import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import DailyReset from './components/DailyReset'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Points from './pages/Points'

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/home', element: <Home /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/points', element: <Points /> },
])

function Root() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <CartProvider id="restack-tasks">
      <DailyReset>
        <RouterProvider router={router} />
      </DailyReset>
    </CartProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
