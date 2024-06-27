const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  hashtags: [{
    type: String,
    required: false
  }],
  createdOn: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Discussion', discussionSchema);
