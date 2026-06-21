import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './router/AppRouter.jsx' 
import { AdminProvider } from './context/AdminContext.jsx' 
import 'bootstrap/dist/css/bootstrap.min.css' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={AppRouter} />
    </AdminProvider>
  </StrictMode>,
)