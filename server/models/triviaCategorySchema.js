const mongoose = require('mongoose');

const triviaCategorySchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Birthday', 'Wedding', etc.
});

const TriviaCategory = mongoose.model('TriviaCategory', triviaCategorySchema);
module.exports = TriviaCategory;
