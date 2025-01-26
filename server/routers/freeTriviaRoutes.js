const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const { amount, category, difficulty, type } = req.query;
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  const api_errors = {
    1: 'Not enough questions available.',
    2: 'Invalid parameters provided.',
    3: 'Session token not found.',
    4: 'Session token exhausted. Please reset.',
    5: 'Too many requests. Try again later.',
  };
  
  try {
    const response = await axios.get(url);

    if (response.data.response_code !== 0) {

      return res.status(400).json({ error: api_errors[response.data.response_code] || 'Unknown error occurred.' });
    }

    res.status(200).json(response.data.results);
  } catch (error) {
   
    res.status(500).json({ error: api_errors[error.response.data.response_code] });
  }
});

module.exports = router;
