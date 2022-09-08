const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

const { newPost, deletePost } = require('../controllers/postController')

router.route('/').post(protect, newPost).delete(protect, deletePost);
router.route('/:id/like').put(protect, updateGoal).delete(protect, deleteGoal);


module.exports = router;