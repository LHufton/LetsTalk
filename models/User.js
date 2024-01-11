const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true }
  },
  { timestamps: true }
)

// Exporting the schema, not the model
module.exports = UserSchema
