// placeFilters.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Get places filtered by specific criteria
router.get('/filter', async (req, res) => {
  const { filterType, filterValue } = req.query;
  let filteredPlaces;

  try {
    switch (filterType) {
      case 'category':
        filteredPlaces = await Place.find({ category: filterValue });
        break;
      // Add other cases for different filtering options (e.g., distance, name, etc.)
      default:
        filteredPlaces = await Place.find();
        break;
    }

    res.json(filteredPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
