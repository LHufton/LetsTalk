const mongoose = require('mongoose')
const FeedSchema = require('./FeedSchema')

const Feed = mongoose.model('Feed', FeedSchema)

module.exports = Feed
