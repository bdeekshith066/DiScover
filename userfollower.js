const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

// Endpoint to get the count of followers for a user
router.get('/followers/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ followersCount: user.followers.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get the count of users a user is following
router.get('/following/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ followingCount: user.following.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

