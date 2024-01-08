import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './Services/Auth'
import Nav from './Components/Nav'
import Feed from './Pages/Feed'
import Register from './Pages/Register'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import Comments from './Components/Comments'
import Posts from './Components/Posts'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

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

  const [themeMode, setThemeMode] = useState('light')

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setThemeMode(storedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  return (
    <div className={`App ${themeMode}`}>
      <header></header>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <button className="darkButton" onClick={toggleTheme}>
          Light/Dark Mode
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
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
