const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'TriviaCategory' },
  
  questions: [
    {
      questionText: { type: String, required: true },
      questionType: { type: String, enum: ['multipleChoice', 'openText'], required: true },
      choices: [{ type: String }],
      correctAnswer: { type: String, required: true },
    },
  ],

  createdAt: { type: Date, default: Date.now },   
  isCustomGame: { type: Boolean, default: false }, 
  isPublic: { type: Boolean, default: true },  
  timesPlayed: { type: Number, default: 0 },     
  timesShared: { type: Number, default: 0 },     
  ratings: [{ type: Number, min: 1, max: 5 }],     

  settings: {
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    timerEnabled: { type: Boolean, default: false },
    timePerQuestion: { type: Number, default: 30 },
    questionType: { type: String, enum: ['multipleChoice', 'trueFalse'], default: 'multipleChoice' },
  },

  status: { type: String, enum: ['waiting', 'active', 'finished'], default: 'waiting' },
  gamePin: { type: String, required: true, unique: true },
});

const TriviaGame = mongoose.model('TriviaGame', GameSchema);
module.exports = TriviaGame;
