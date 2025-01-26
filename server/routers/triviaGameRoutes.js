const express = require('express');
const TriviaGame = require('../models/triviaGameSchema');
const { User } = require('../models/userSchema');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add new game
router.post('/add-game', authMiddleware, async (req, res) => {
  const createdBy = req.user.userId;
  const username = req.user.username;
  const { gameName, category, questions } = req.body;

//   if (!gameName || !category) {
//     return res.status(400).json({ error: 'Game name and category are required.' });
//   }

//   if (!Array.isArray(questions) || questions.length === 0) {
//     return res.status(400).json({ error: 'At least one question is required.' });
//   }

  for (const question of questions) {
    const { questionText, questionType, choices, correctAnswer } = question;

    if (!questionText || !questionType) {
      return res.status(400).json({ error: 'Each question requires text and type.' });
    }

    if (questionType === 'multipleChoice') {
      if (!Array.isArray(choices) || choices.length < 2 || !correctAnswer) {
        return res.status(400).json({ error: 'Multiple choice questions require choices and a correct answer.' });
      }
    }
  }

  try {
    const newGame = new TriviaGame({ gameName, createdBy, category, questions });
    await newGame.save();

    const user = await User.findById(createdBy);
    if (user) {
      user.createdTriviaGames.push(newGame._id);
      await user.save();
    }

    res.status(201).json({ ...newGame.toObject(), createdByName: username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all games
router.get('/all-trivia-games', async (req, res) => {
  try {
    const games = await TriviaGame.find().populate('createdBy');
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
