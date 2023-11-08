// Trip.js - This model represents the scheduled trips by users

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Trip', tripSchema);
