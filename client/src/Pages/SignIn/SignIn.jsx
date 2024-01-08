import { useState } from 'react'
import { SignInUser } from '../../Services/Auth'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    setUser(payload)
    navigate('/home')
  }

  return (
    <div className="container">
      <h2>Sign In</h2>
      <div className="signIn-form">
        <form id="SignIn" onSubmit={handleSubmit}>
          <div className="input-wrapper-email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper-password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
