import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/Header'
import Footer from './Components/Footer'

function App() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App