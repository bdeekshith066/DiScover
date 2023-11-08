// advancedNotifications.js
const express = require('express');
const router = express.Router();
const UserNotificationPreference = require('../models/UserNotificationPreference');
const Notification = require('../models/notification');

// Set user notification preferences
router.post('/preferences', async (req, res) => {
  const { userId, preferences } = req.body;

  try {
    // Save or update user notification preferences
    await UserNotificationPreference.findOneAndUpdate(
      { userId },
      { preferences },
      { upsert: true }
    );

    res.status(200).json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user notification preferences
router.get('/preferences/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user's notification preferences
    const preferences = await UserNotificationPreference.findOne({ userId });

    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More advanced functionalities for managing and customizing notifications

module.exports = router;
