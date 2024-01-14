const { Post } = require('../models')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CreatePost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body })
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const UpdatePost = async (req, res) => {
  try {
    const { post_id } = req.params
    // Validate post_id here if necessary
    const post = await Post.findByIdAndUpdate(post_id, req.body, { new: true })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const DeletePost = async (req, res) => {
  try {
    const { post_id } = req.params
    // Validate post_id here if necessary
    await Post.deleteOne({ _id: post_id })
    return res.status(200).json({ msg: 'Post Deleted', payload: post_id })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost
}
