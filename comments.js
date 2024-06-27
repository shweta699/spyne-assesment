const express = require('express');
const { createComment, updateComment, deleteComment, likeComment, unlikeComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
router.post('/:id/like', auth, likeComment);
router.post('/:id/unlike', auth, unlikeComment);

module.exports = router;
