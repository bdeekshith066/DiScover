// reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review.js');
const verifyToken = require('./auth').verifyToken; // Import the verifyToken function

// Sample routes for managing place reviews

// Add a review for a place
router.post('/add/:placeId', verifyToken, async (req, res) => {
  const { rating, comment } = req.body;
  const userId = getUserIdFromToken(req.headers.authorization);
  const placeId = req.params.placeId;

  try {
    const review = new Review({
      place: placeId,
      user: userId,
      rating,
      comment,
      // additional fields as needed
    });
  
    const newReview = await review.save();
    res.json(newReview);
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
