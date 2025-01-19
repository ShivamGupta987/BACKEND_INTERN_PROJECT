const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
// Middleware to protect routes by verifying JWT token
const protect = async (req, res, next) => {
  debugger
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; 

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware for admin-only access
const adminOnly = async (req, res, next) => {
  debugger
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token,"token")
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, invalid admin' });
    }

    req.admin = admin; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect, adminOnly };