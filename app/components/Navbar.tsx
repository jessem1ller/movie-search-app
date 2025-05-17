import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="bg-purple-800 py-8 px-4">
        {" "}
        <div className="flex justify-between items-center">
          <Image className='bg-white bg-opacity-95 p-1 rounded-full' src="/android-chrome-192x192.png" alt="Logo" width={70} height={70} />
          <h1 className="text-white font-bold text-4xl ">FlixFinder</h1>
          <div className="flex space-x-4">
            {" "}
            <a href="./" className="text-white relative group">
              {" "}
              Home
              <span className="absolute left-0 bottom-0 h-1 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>{" "}
            </a>
            <a href="/about" className="text-white relative group">
              About
              <span className="absolute left-0 bottom-0 h-1 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar