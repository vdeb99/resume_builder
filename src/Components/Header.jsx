import React from 'react'
import { useUser } from '@clerk/react-router'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()
  
  return (
    <header className='shadow-sm border-b mx-px'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          <Link to='/' className='flex items-center'>
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className='h-8 w-auto'
            />
          </Link>

          
          {isLoaded && (
            <nav className='flex items-center gap-6'>
              {!isSignedIn ? (
                <Link 
                  to='/auth/sign-in'
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                >
                  Get Started
                </Link>
              ) : (
                <div className='flex items-center gap-4'>
                  <Link 
                    to='/dashboard'
                    className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to='/create-resume'
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                  >
                    Create Resume
                  </Link>
                  <UserButton afterSignOutUrl='/' />
                </div>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header