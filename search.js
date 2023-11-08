// search.js
const express = require('express');
const router = express.Router();
const Place = require('../models/pttlace');

// Sample route for searching places
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword parameter is required' });
    }

    const regex = new RegExp(keyword, 'i'); // Case-insensitive search
    const places = await Place.find({
      $or: [
        { name: regex },
        { description: regex },
        // Add more fields to search if needed
      ],
    });

    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
