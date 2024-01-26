import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
const Home = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Todo: Add OAuth.
  // const handleAuthClick = () => {
  //   setIsLoggedIn(!isLoggedIn)
  // }

  let navigate = useNavigate()

  return (
    <div className="home-container">
      <h2 className="home"> Let's talk...</h2>
      <section className="home-signin">
        <p>Welcome back!</p>
        <button onClick={() => navigate('signin')}>Sign In</button>
      </section>
      <section className="home-register">
        <p>New users</p>
        <button onClick={() => navigate('register')}>Register</button>
      </section>
    </div>
  )
}

export default Home
