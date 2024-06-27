const express = require('express');
const { listUsers, getUser, createUser, updateUser, deleteUser, searchUser,followUser, unfollowUser } = require('../controllers/userController.js');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/users/:userId/follow', auth, followUser);
router.delete('/users/:userId/unfollow', auth, unfollowUser);
router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/search', searchUser);

module.exports = router;
