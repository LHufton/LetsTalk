const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

const comparePassword = async (storedPassword, password) => {
  return bcrypt.compare(password, storedPassword)
}

const createToken = (payload) => {
  return jwt.sign(payload, APP_SECRET)
}

const stripToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) throw new Error('No authorization header')

    const token = authHeader.split(' ')[1]
    if (!token) throw new Error('Bearer token not found')

    res.locals.token = token
    next()
  } catch (error) {
    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: ' + error.message })
  }
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    const payload = jwt.verify(token, APP_SECRET)
    if (!payload) throw new Error('Invalid token')

    res.locals.payload = payload
    next()
  } catch (error) {
    res
      .status(401)
      .send({ status: 'Error', msg: 'Verify Token Error: ' + error.message })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
}
