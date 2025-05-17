import React from 'react'

const About = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <h1 className="text-3xl text-dark-500">About Jesse Miller</h1>
        <p className="mt-4 text-lg">Welcome to my movie search app! I'm Jesse Miller, a passionate developer who loves movies and technology.</p>
        <p className="mt-2 text-lg">This app allows you to search for movies, view details, and find your next favorite film.</p>
        <p className="mt-2 text-lg">I hope you enjoy using it as much as I enjoyed building it!</p>
        <p className="mt-2 text-lg">Feel free to reach out if you have any questions or feedback.</p>
        <p className="mt-2 text-lg">Happy movie watching!</p>

        <p className="mt-2 text-lg">- Jesse</p>
        <p className="mt-2 text-lg">Email: silverhonda84@gmail.com</p>
        <p className="mt-2 text-lg">GitHub: <a href="https://github.com/jessem1ller" className="text-blue-300">jessem1ller</a></p>
    </div>
        </>
  )
}

export default About