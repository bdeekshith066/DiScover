// userProfile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get user profile details
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile details
router.put('/update/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedInfo = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedInfo, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
