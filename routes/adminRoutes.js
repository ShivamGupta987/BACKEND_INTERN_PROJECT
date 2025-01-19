const express = require('express');
const { registerAdmin, loginAdmin, getAllUsers } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', adminOnly, registerAdmin); 
router.post('/login', loginAdmin);
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;