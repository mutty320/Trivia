const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Birthday', 'Wedding', etc.
});

const TriviaCategory = mongoose.model('TriviaCategory', CategorySchema);
module.exports = TriviaCategory;
