import { useUser } from '@clerk/react-router'

import { Outlet,Navigate } from 'react-router-dom'
import {Header,Footer} from './Components/index.components.js'


export default function App() {
  const {user,isLoaded,isSignedIn}=useUser()
  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'} />
  }
  return (
   <>
    <Header />
      <Outlet />
    <Footer />
   </>
  )
}
