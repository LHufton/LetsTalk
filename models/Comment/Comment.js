const mongoose = require('mongoose')
const CommentSchema = require('./CommentSchema')

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
