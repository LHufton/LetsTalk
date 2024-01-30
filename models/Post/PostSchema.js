const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    content: { type: String },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = {
  PostSchema
}
