
const express = require('express');
const router = express.Router();

const { registerUser, LoginUser, getMe, getAllUsers } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', LoginUser);
router.get('/me', protect, getMe);
router.get('/allusers', protect, getAllUsers);

module.exports = router;