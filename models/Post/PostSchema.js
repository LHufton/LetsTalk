const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = require('../Comment/CommentSchema')
const PostSchema = new Schema(
  {
    title: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String },
    isPublic: { type: Boolean, default: false },
    comments: [CommentSchema]
  },
  { timestamps: true }
)

module.exports = PostSchema
