import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {SignIn} from './Auth/index.auth.js'
import {Home,CreateResume,Dashboard} from './Pages/index.pages.js'

const router=createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/create-resume',
        element:<CreateResume/>
      }

    ]
    
  },
  {
    path:'/sign-in',
    element:<SignIn/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
