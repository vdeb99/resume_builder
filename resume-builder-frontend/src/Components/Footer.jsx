import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-blue-400 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer