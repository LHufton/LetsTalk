const mongoose = require('mongoose')
require('dotenv').config()

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment.')
  process.exit(1) // Exit the application if database URI is not provided
}

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // You can add more options if required
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, options)
  .then(() => console.log('Successfully connected to MongoDB . . .'))
  .catch((e) => console.error('Connection error', e.message))

const db = mongoose.connection

// Additional connection event listeners
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('disconnected', () => console.log('MongoDB disconnected'))
db.on('reconnected', () => console.log('MongoDB reconnected'))

module.exports = db
