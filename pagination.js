// pagination.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Get paginated places
router.get('/places', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const places = await Place.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
