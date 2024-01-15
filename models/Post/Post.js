const mongoose = require('mongoose')
const PostSchema = require('./PostSchema')

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
