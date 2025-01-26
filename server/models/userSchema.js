// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }, // Store the hashed password
//   createdTriviaGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TriviaGame' }], // Associated trivia events - one-to-many relationship
// }, { discriminatorKey: 'userType' }); // Add a discriminator key to distinguish between user types


// // 2. Create the base model
// const User = mongoose.model('User', userSchema);

// // 3. Define the `Individual` discriminator (no extra fields needed)
// const Individual = User.discriminator('individual', new mongoose.Schema({}));

// // 4. Define the `Institution` discriminator with additional fields
// const Institution = User.discriminator('institution', new mongoose.Schema({
//   institutionName: { type: String, required: true },
// }));

// // 5. Export the models
// module.exports = {
//   User,          // Base model
//   Individual,    // Individual discriminator
//   Institution,   // Institution discriminator
// };

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store the hashed password
  createdTriviaGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TriviaGame' }], // Associated trivia games - one-to-many relationship
}, { discriminatorKey: 'userType' }); // Add a discriminator key to distinguish between user types

// 2. Create the base model
const User = mongoose.model('User', userSchema);

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
