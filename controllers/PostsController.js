const Post = require('../models/Post/Post')

const GetPosts = async (req, res) => {
  try {
    // experimental. Can't read posts on transition from comments attached to post. 01-25-2024
    const { user_id } = req.params
    const posts = await Post.find({}).populate('comments')
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CreatePost = async (req, res) => {
  try {
    const newPost = { ...req.body, comments: [] }
    const post = await Post.create(newPost)
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const UpdatePost = async (req, res) => {
  try {
    const { post_id } = req.params
    const post = await Post.findByIdAndUpdate(post_id, req.body, { new: true })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const DeletePost = async (req, res) => {
  try {
    const { post_id } = req.params
    await Post.deleteOne({ _id: post_id })
    return res.status(200).json({ msg: 'Post Deleted', payload: post_id })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const AddCommentToPost = async (req, res) => {
  try {
    const { post_id } = req.params
    const { comment_id } = req.body // Assuming comment_id is passed in the request body
    const post = await Post.findByIdAndUpdate(
      post_id,
      { $push: { comments: comment_id } },
      { new: true }
    ).populate('comments')
    return res.status(200).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const RemoveCommentFromPost = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params
    const post = await Post.findByIdAndUpdate(
      post_id,
      { $pull: { comments: comment_id } },
      { new: true }
    ).populate('comments')
    return res.status(200).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  AddCommentToPost,
  RemoveCommentFromPost
}
