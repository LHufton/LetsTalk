const mongoose = require('mongoose')
const UserSchema = require('./User/UserSchema')
const PostSchema = require('./Post/PostSchema')
const CommentSchema = require('./Comment/CommentSchema')
const FeedSchema = require('./Feed/FeedSchema')

const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)
const Comment = mongoose.model('Comment', CommentSchema)
const Feed = mongoose.model('Feed', FeedSchema)

module.exports = {
  User,
  Post,
  Comment,
  Feed
}
