const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword, phone });

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isActive) return res.status(403).json({ message: 'Account is deactivated' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get User Details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update User Details
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Deactivate Account
const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isActive) return res.status(400).json({ message: 'Account is already deactivated' });

    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'Account deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { registerUser, loginUser, getUserDetails, updateUser, deactivateAccount };