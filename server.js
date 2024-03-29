const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const AuthRouter = require('./routes/AuthRouter')
const CommentRouter = require('./routes/CommentRouter')
const PostRouter = require('./routes/PostRouter')
const FeedRouter = require('./routes/FeedRouter')

const PORT = process.env.PORT || 3001
const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')))

// API routes
app.use('/auth', AuthRouter)
app.use('/comments', CommentRouter)
app.use('/posts', PostRouter)
app.use('/feed', FeedRouter)

// The catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
