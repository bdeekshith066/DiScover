// placeSorting.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Get places sorted by user preferences
router.get('/sort', async (req, res) => {
  const { sortType } = req.query;
  let places;

  try {
    switch (sortType) {
      case 'near-me':
        // Logic to sort places based on user's location
        // Implement logic to sort places near the user's location
        break;
      case 'top-rated':
        places = await Place.find().sort({ averageRating: -1 });
        break;
      default:
        places = await Place.find();
        break;
    }

    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
