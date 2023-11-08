// performanceOptimization.js
const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Implement pagination to optimize query performance
router.get('/places', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Place.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.places = await Place.find().limit(limit).skip(startIndex).exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More performance optimizations related to database queries and response handling

module.exports = router;
