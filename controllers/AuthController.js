const { User } = require('../models/User')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let [existingUser] = await User.find({ email }).limit(1)

    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const user = await User.create({ name, email, passwordDigest })
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const [user] = await User.find({ email }).limit(1)

    if (user) {
      let matched = await middleware.comparePassword(
        user.passwordDigest,
        password
      )
      if (matched) {
        let payload = { id: user.id, email: user.email }
        let token = middleware.createToken(payload)
        return res.send({ user: payload, token })
      }
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.params.user_id)
    if (!user) {
      return res.status(404).send('User not found')
    }

    const isMatch = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (!isMatch) {
      return res.status(401).send('Old password does not match')
    }

    const passwordDigest = await middleware.hashPassword(newPassword)
    user.passwordDigest = passwordDigest
    await user.save()

    res.send({ status: 'Password updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error updating password')
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
