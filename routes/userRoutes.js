const express = require('express');
const { registerUser, loginUser, getUserDetails, updateUser, deactivateAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserDetails);
router.put('/update', protect, updateUser);
router.put('/deactivate', protect, deactivateAccount);

module.exports = router;