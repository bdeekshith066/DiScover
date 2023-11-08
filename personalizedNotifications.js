// personalizedNotifications.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const Notification = require('../models/notification');
const moment = require('moment');

// Send personalized pre-trip notification
router.post('/send/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId).populate('placeId').populate('userId');
    const notificationDate = moment(trip.date).subtract(1, 'day'); // Get one day before the trip

    // Fetch user's notification preferences
    const userPreferences = await UserNotificationPreference.findOne({ userId: trip.userId });

    let message = `Dear Traveler, You are scheduled to visit ${trip.placeId.name} tomorrow.`;
    // Include additional instructions based on user preferences
    if (userPreferences.preferences.includeInstructions) {
      message += `Here are some instructions: ${trip.placeId.instructions}.`;
    }
    // Include weather updates if preferred
    if (userPreferences.preferences.includeWeatherUpdates) {
      // Fetch weather updates based on the trip location and date
      const weatherForecast = "Weather Forecast"; // Fetch weather data based on your preferred service
      message += `Weather Update: ${weatherForecast}.`;
    }
    message += `Have a happy journey!`;

    const preTripNotification = new Notification({
      recipient: trip.userId,
      message,
    });

    // Send the personalized pre-trip notification
    await preTripNotification.save();

    res.status(200).json({ message: 'Personalized pre-trip notification sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
