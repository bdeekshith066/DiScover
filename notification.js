const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String, // Notification content or message
  sentAt: { type: Date, default: Date.now },
  // Other fields related to notifications
});

module.exports = mongoose.model('Notification', notificationSchema);
