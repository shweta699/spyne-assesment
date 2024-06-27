const Discussion = require('../models/discussion');
const Hashtag = require('../models/hashtag');

exports.createDiscussion = async (req, res) => {
  try {
    const { text, imageUrl, hashtags } = req.body;
    // Log userId to ensure it's being set
    console.log("User ID:", req.userId);
    const newDiscussion = new Discussion({
      text,
      imageUrl,
      user: req.userId // This line ensures user field is populated
    });
    if (hashtags) {
      const tags = await Promise.all(hashtags.map(async (tag) => {
        let hashtag = await Hashtag.findOne({ tag });
        if (!hashtag) {
          hashtag = new Hashtag({ tag });
          await hashtag.save();
        }
        return hashtag._id;
      }));
      newDiscussion.hashtags = tags;
    }
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const updates = req.body;
    const discussion = await Discussion.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json({ message: 'Discussion deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDiscussionsByTag = async (req, res) => {
  try {
    const tag = req.query.tag;
    const hashtag = await Hashtag.findOne({ tag });
    if (!hashtag) {
      return res.status(404).json({ message: 'Hashtag not found' });
    }
    const discussions = await Discussion.find({ hashtags: hashtag._id });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDiscussionsByText = async (req, res) => {
  try {
    const text = req.query.text;
    const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
