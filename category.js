// Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  // other fields as needed
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
