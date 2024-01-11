const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema

var Comment = new commentSchema(
  {
    title: { type: String, required: false },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
  },
  { timestamps: true }
)

module.exports = Comment
