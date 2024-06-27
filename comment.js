const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
