// placeRatings.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const Review = require('../models/Review');

// Get overall ratings for a place
router.get('/ratings/:placeId', async (req, res) => {
  try {
    const placeId = req.params.placeId;
    const ratings = await Review.find({ place: placeId }).select('rating');
    
    if (ratings.length === 0) {
      return res.json({ averageRating: 0, totalRatings: 0 });
    }

    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, curr) => sum + curr.rating, 0);
    const averageRating = sumRatings / totalRatings;

    res.json({ averageRating, totalRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User can give a rating to a place
router.post('/rate/:placeId', async (req, res) => {
  const { rating } = req.body;
  const userId = getUserIdFromToken(req.headers.authorization);
  const placeId = req.params.placeId;

  try {
    const review = new Review({
      place: placeId,
      user: userId,
      rating,
      // additional fields as needed
    });
  
    const newRating = await review.save();
    res.json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to extract user ID from JWT token
function getUserIdFromToken(token) {
  // Your logic to extract user ID from the JWT token
  // Example:
  // Decode the token to extract user ID
  // ...

  return userId;
}

module.exports = router;
