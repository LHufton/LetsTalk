// const router = require('express').Router()
// const postsController = require('../controllers/PostsController') // Updated to PostsController
// const middleware = require('../middleware')

// // Get all comments for a specific post
// router.get('/posts/:postId/comments', postsController.GetPosts)

// // Add a new comment to a post
// router.post(
//   '/posts/:postId/comments',
//   middleware.stripToken,
//   middleware.verifyToken,
//   postsController.AddCommentToPost
// )

// // Update a comment on a post
// router.put(
//   '/posts/:postId/comments/:commentId',
//   middleware.stripToken,
//   middleware.verifyToken,
//   postsController.UpdateCommentInPost
// )

// // Delete a comment from a post
// router.delete(
//   '/posts/:postId/comments/:commentId',
//   middleware.stripToken,
//   middleware.verifyToken,
//   postsController.DeleteCommentFromPost
// )

// module.exports = router
