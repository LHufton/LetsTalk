const mongoose = require('mongoose')
const UserSchema = require('./User')
const PostSchema = require('./Post')
const CommentSchema = require('./Comment')
const FeedSchema = require('./Feed')

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
