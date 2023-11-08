// UserNotificationPreference.js - This model stores user notification preferences

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userNotificationPreferenceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  preferences: {
    type: Map,
    of: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('UserNotificationPreference', userNotificationPreferenceSchema);
