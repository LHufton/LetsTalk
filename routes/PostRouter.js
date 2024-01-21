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
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePost
)
router.delete(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)

// New routes for Comment operations within a Post
router.post(
  '/:post_id/comments',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddCommentToPost
)
router.put(
  '/:post_id/comments/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePostComment
)
router.delete(
  '/:post_id/comments/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCommentFromPost
)

module.exports = router
