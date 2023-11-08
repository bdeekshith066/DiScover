// Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: Number,
  comment: String,
  // other review fields as needed
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
