const router = require('express').Router()
const controller = require('../controllers/PostsController')
const middleware = require('../middleware')

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

module.exports = router
