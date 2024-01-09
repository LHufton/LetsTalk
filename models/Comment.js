const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
  },
  { timestamps: true }
)

module.exports = commentSchema
