// const mongoose = require('mongoose');


// const triviaGameSchema = new mongoose.Schema({
//     eventName: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User (either Individual or Institution)
//     eventType: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType' },
//     questions: [{
//       questionText: { type: String, required: true },
//       questionType: { type: String, enum: ['multipleChoice', 'openText'], required: true },
//       choices: [{ type: String }],
//       correctAnswer: { type: String, required: true },
//     }],
//   });
  
//   const TriviaGame = mongoose.model('TriviaGame', triviaGameSchema);
//   module.exports = TriviaGame;

const mongoose = require('mongoose');

const triviaGameSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'TriviaCategory' }, // Updated to "category"
  questions: [
    {
      questionText: { type: String, required: true },
      questionType: { type: String, enum: ['multipleChoice', 'openText'], required: true },
      choices: [{ type: String }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

const TriviaGame = mongoose.model('TriviaGame', triviaGameSchema);
module.exports = TriviaGame;
