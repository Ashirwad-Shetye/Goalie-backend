
const express = require('express');
const router = express.Router();

const { registerUser, LoginUser, getMe, deleteUser, getUserById, getAllUsers } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', LoginUser);
router.get('/me', protect, getMe);
router.get('/:id', protect, getUserById)
router.delete('/:id',protect, deleteUser)
router.get('/allusers', protect, getAllUsers);

module.exports = router;