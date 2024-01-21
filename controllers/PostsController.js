const Post = require('../models/Post/Post')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const CreatePost = async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const UpdatePost = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findByIdAndUpdate(postId, req.body, { new: true })
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const DeletePost = async (req, res) => {
  try {
    const { postId } = req.params
    await Post.deleteOne({ _id: postId })
    res.status(200).json({ message: 'Post Deleted' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const AddCommentToPost = async (req, res) => {
  const { postId } = req.params
  const newComment = req.body

  try {
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    post.comments.push(newComment)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const UpdateCommentInPost = async (req, res) => {
  const { postId, commentId } = req.params

  try {
    const post = await Post.findById(post_id)
    const comment = post.comments.id(comment_id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    comment.set(req.body)
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteCommentFromPost = async (req, res) => {
  const { postId, commentId } = req.params

  try {
    const post = await Post.findById(post_id)
    const comment = post.comments.id(comment_id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    comment.remove()
    await post.save()
    res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const GetPostComments = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findById(postId).populate('comments') // Assuming you want to populate the comments
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post.comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetPosts,
  GetPostComments,
  CreatePost,
  UpdatePost,
  DeletePost,
  AddCommentToPost,
  UpdateCommentInPost,
  DeleteCommentFromPost
}
