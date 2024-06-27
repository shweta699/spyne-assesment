const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const { text, discussionId } = req.body;

    const newComment = new Comment({
      text,
      user: req.userId,
      discussion: discussionId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updates = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (!comment.likes.includes(req.userId)) {
      comment.likes.push(req.userId);
      await comment.save();
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const index = comment.likes.indexOf(req.userId);
    if (index !== -1) {
      comment.likes.splice(index, 1);
      await comment.save();
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
