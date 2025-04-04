const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Store the hashed password
  
  // New fields for Google Auth
  googleId: { type: String },
  profilePicture: { type: String },

  createdTriviaGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TriviaGame' }], // Associated trivia games - one-to-many relationship
}, { discriminatorKey: 'userType', timestamps: true }); // Add a discriminator key to distinguish between user types

// 2. Create the base model
const User = mongoose.model('User', UserSchema);

// 3. Define the `Individual` discriminator (no extra fields needed)
const Individual = User.discriminator('individual', new mongoose.Schema({}));

// 4. Define the `Institution` discriminator with additional fields
const Institution = User.discriminator('institution', new mongoose.Schema({
  institutionName: { type: String, required: true },
}));

// 5. Export the models
module.exports = {
  User,          // Base model
  Individual,    // Individual discriminator
  Institution,   // Institution discriminator
};
