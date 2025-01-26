const express = require('express');
const TriviaCategory = require('../models/triviaCategorySchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await TriviaCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
