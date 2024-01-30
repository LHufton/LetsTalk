const Post = require('../models/Post/Post')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('comments') // Added .populate('comments') to include comment details
    return res.status(200).json(posts) // This should be uncommented and used
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const CreatePost = async (req, res) => {
  try {
    const newPost = { ...req.body, comments: [] }
    const post = await Post.create(newPost)
    return res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const UpdatePost = async (req, res) => {
  try {
    const { post_id } = req.params
    const post = await Post.findByIdAndUpdate(post_id, req.body, { new: true })
    return res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
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
    const { comment_id } = req.body
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

const UpdateCommentInPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const { content } = req.body

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comment = post.comments.id(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    comment.content = content
    await post.save()

    return res.status(200).json({ message: 'Comment updated', post })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteCommentFromPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const commentExists = post.comments.some((comment) =>
      comment._id.equals(commentId)
    )
    if (!commentExists) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    post.comments = post.comments.filter(
      (comment) => !comment._id.equals(commentId)
    )
    await post.save()

    return res.status(200).json({ message: 'Comment deleted', post })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  AddCommentToPost,
  UpdateCommentInPost,
  DeleteCommentFromPost,
  RemoveCommentFromPost
}
