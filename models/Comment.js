const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
