const Comment = require('../models/Comment/Comment');
const Post = require('../models/Post/Post'); // Include Post model

const GetComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ...req.query });
    console.log('Fetched Comments: ', comments);
    res.send(comments);
  } catch (error) {
    console.error('Error in GetComments: ', error);
    res.status(500).send({ error: error.message });
  }
};

const CreateComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body });
    // Update the corresponding post to include this comment
    await Post.findByIdAndUpdate(req.body.post, { $push: { comments: comment._id } });
    res.send(comment);
  } catch (error) {
    console.error('Error in CreateComment: ', error);
    res.status(500).send({ error: error.message });
  }
};

const UpdateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body,
      { new: true }
    );
    res.send(comment);
  } catch (error) {
    console.error('Error in UpdateComment: ', error);
    res.status(500).send({ error: error.message });
  }
};

const DeleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.comment_id });
    // Remove the comment's reference from the corresponding post
    await Post.findOneAndUpdate({ comments: req.params.comment_id }, { $pull: { comments: req.params.comment_id } });
    res.send({
      msg: 'Comment Deleted',
      payload: req.params.comment_id,
      status: 'Ok'
    });
  } catch (error) {
    console.error('Error in DeleteComment: ', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  GetComments,
  CreateComment,
  UpdateComment,
  DeleteComment
};
