

const express = require('express');
const router = express.Router();
const TriviaGame = require('../models/GameSchema');
const { getIO } = require('../socket'); // ✅ Import WebSocket from socket.js

router.post('/', async (req, res) => {
    try {
        const { gamePin, playerName } = req.body;
        console.log(`${gamePin} - Player joining: ${playerName}`);

        let game = await TriviaGame.findOne({ gamePin });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        const playerId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // ✅ Emit event to WebSocket (waiting room update)
        getIO().to(gamePin).emit('updatePlayers', { playerId, playerName });

        // ✅ Send response back to frontend so it can navigate to Waiting Room
        res.json({ message: 'Joined successfully', gameId: game._id, playerId });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
