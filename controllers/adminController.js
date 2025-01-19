const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Admin Registration (Only for super-admin or authorized users)
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists by email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = await Admin.create({ name, email, password: hashedPassword });

    // Respond with success message
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Users (for admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: 'No users found' });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { registerAdmin, loginAdmin, getAllUsers };