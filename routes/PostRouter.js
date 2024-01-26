const router = require('express').Router()
const controller = require('../controllers/PostsController')
console.log(controller)
const middleware = require('../middleware')

// Existing Post routes
router.get('/', controller.GetPosts)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePost
)
router.put(
  '/:postId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePost
)
router.delete(
  '/:postId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)
router.post(
  '/:post_id/comments',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddCommentToPost
)
router.delete(
  '/:post_id/comments/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.RemoveCommentFromPost
)

// New routes for Comment operations within a Post
router.post(
  '/:postId/comments',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddCommentToPost
)
router.put(
  '/:postId/comments/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateCommentInPost
)
router.delete(
  '/:postId/comments/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCommentFromPost
)

module.exports = router
