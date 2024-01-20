const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)
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

module.exports = {
  PostSchema,
  CommentSchema
}
