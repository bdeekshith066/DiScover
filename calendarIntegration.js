// calendarIntegration.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const Notification = require('../models/notification');
const moment = require('moment');

// Schedule a trip on a specific date to a place
router.post('/schedule', async (req, res) => {
  const { userId, placeId, date } = req.body;

  try {
    const newTrip = new Trip({
      userId,
      placeId,
      date: moment(date).toISOString(), // Convert date to ISO format
    });

    // Save the scheduled trip
    await newTrip.save();

    res.status(201).json({ message: 'Trip scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Redirect to the specific page for the scheduled place
router.get('/redirect/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);

    // Logic to redirect to the specific place's page

    res.status(200).json({ message: 'Redirecting to the place page' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send pre-trip notification one day before the scheduled trip
router.post('/send-notification/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId).populate('placeId');
    const notificationDate = moment(trip.date).subtract(1, 'day'); // Get one day before the trip

    const preTripNotification = new Notification({
      recipient: trip.userId,
      message: `Dear Traveler, You are scheduled to visit ${trip.placeId.name} tomorrow. 
      Here are some instructions: ${trip.placeId.instructions}. Have a happy journey!`,
    });

    // Send the pre-trip notification
    await preTripNotification.save();

    res.status(200).json({ message: 'Pre-trip notification sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
