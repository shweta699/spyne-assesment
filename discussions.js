const express = require('express');
const { createDiscussion, updateDiscussion, deleteDiscussion, getDiscussionsByTag, getDiscussionsByText } = require('../controllers/discussionController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.get('/tags', getDiscussionsByTag);
router.get('/search', getDiscussionsByText);

module.exports = router;
