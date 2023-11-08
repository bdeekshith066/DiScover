// calendarEnhancements.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const TripNote = require('../models/TripNote');

// Add a trip note for a specific trip
router.post('/add-note/:tripId', async (req, res) => {
  const { tripId } = req.params;
  const { note } = req.body;

  try {
    const newNote = new TripNote({
      tripId,
      note,
    });

    await newNote.save();

    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trip notes for a specific trip
router.get('/notes/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    const notes = await TripNote.find({ tripId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More functionalities for reminders and collaborative trip planning

module.exports = router;
