import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './Services/Auth'
import Nav from './Components/Nav/Nav'
import Feed from './Pages/Feed/Feed'
import Register from './Pages/Register/Register'
import SignIn from './Pages/SignIn/SignIn'
import Home from './Pages/Home/Home'
import Comments from './Components/Comments/Comments'
import Posts from './Components/Posts/Posts'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  return (
    <div>
      <header></header>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/comments" element={<Comments user={user} />} />
          <Route path="/feed" element={<Feed user={user} />} />
          <Route path="/posts" element={<Posts user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
