const express = require('express');
const router = express.Router();
const { setComment, updateComment, deleteComment} = require('../controllers/commentController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').post(protect, setComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);

module.exports = router