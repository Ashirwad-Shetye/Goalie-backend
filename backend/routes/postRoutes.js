const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

const { newPost, deletePost, likePost, allPosts } = require('../controllers/postController')

router.route('/').post(protect, newPost).delete(protect, deletePost);
router.route('/:id/like').put(protect, likePost);
router.route('/allposts').get(protect, allPosts);


module.exports = router;