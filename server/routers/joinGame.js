const express = require('express');
const router = express.Router();

const TriviaGame = require('../models/GameSchema');


router.post('/', async (req, res) => {
    try {
        const { gamePin, playerName } = req.body;
        //console.log( gamePin + " hi == im == in " + playerName)

    const game = await TriviaGame.findOne({ gamePin });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const playerId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    game.activePlayers.push({ playerId, playerName, score: 0 });
    await game.save();

    res.json({ message: 'Joined successfully', gameId: game._id, playerId });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
