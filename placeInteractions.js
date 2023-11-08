// placeInteractions.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const Review = require('../models/Review');

// Like a specific place
router.post('/like/:placeId', async (req, res) => {
  const { placeId } = req.params;

  try {
    // Logic to handle liking a place
    // You can update the 'likes' count in the Place model

    res.status(200).json({ message: 'Place liked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a comment on a specific place
router.post('/comment/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const { userId, comment } = req.body;

  try {
    const newComment = new Review({
      userId,
      placeId,
      comment,
      // other review details (if needed)
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment posted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More functionalities for user interactions on place pages

module.exports = router;
