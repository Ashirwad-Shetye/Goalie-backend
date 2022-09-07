
const express = require('express');
const router = express.Router();

const { registerUser, LoginUser, getMe, deleteUser, getUserById, getAllUsers } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', LoginUser);
router.get('/users',protect, getAllUsers)
router.get('/me', protect, getMe);
router.get('/:id', protect, getUserById)
router.delete('/:id',protect, deleteUser)

module.exports = router;