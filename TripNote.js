// TripNote.js - Model for trip-specific notes

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripNoteSchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TripNote', tripNoteSchema);
