// adminPanel.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Place = require('../models/place');
const Review = require('../models/Review');

// Get all users (admin functionality)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all places (admin functionality)
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment (admin functionality)
router.delete('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Review.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Implement logic for deleting the comment
    await Review.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More functionalities for user and place management

module.exports = router;
