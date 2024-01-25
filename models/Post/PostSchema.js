const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    content: { type: String },
    isPublic: { type: Boolean, default: false },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
)

module.exports = PostSchema
