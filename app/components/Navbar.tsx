import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="bg-purple-800 py-8 px-4">
        {" "}
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl">FlixFinder</h1>
          <div className="flex space-x-4">
            {" "}
            <a href="./" className="text-white relative group">
              {" "}
              Home
              <span className="absolute left-0 bottom-0 h-1 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>{" "}
            </a>
            <a href="../pages/about" className="text-white relative group">
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