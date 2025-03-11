const express = require('express');
const router = express.Router();
const TriviaGame = require('../models/GameSchema');

// ✅ TEMPORARY: Hardcoded user ID (Replace with real authentication later)
const HARDCODED_USER_ID = '66e8724e41e5513dbb806444';

router.get('/', async (req, res) => {
  try {
    console.log("🔍 Fetching games for user:", HARDCODED_USER_ID);

    // ✅ Query the database for games created by this user
    const games = await TriviaGame.find({ createdBy: HARDCODED_USER_ID });

    if (!games.length) {
      return res.status(404).json({ error: 'No games found for this user' });
    }

    console.log("✅ Games found:", games.length);
    res.json(games);
  } catch (error) {
    console.error("❌ Error fetching games:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
