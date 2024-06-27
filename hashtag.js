const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true }
});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

module.exports = Hashtag;
