const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const admin = require('firebase-admin');
const serviceAccount = require('../triviaapp-454116-firebase-adminsdk-fbsvc-7d5ca28ce3.json')

// Initialize Firebase Admin SDK (do this once, at the top level of your server code)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}


const { User, Individual, Institution } = require('../models/UserSchema');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register User
router.post('/register', async (req, res) => {
  const { username, email, password, userType, institutionName } = req.body;

  try {
    if (!username || !email || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['individual', 'institution'].includes(userType)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    let user;
    if (userType === 'institution') {
      if (!institutionName) {
        return res.status(400).json({ error: 'Institution name is required' });
      }
      user = new Institution({ username, email, password, institutionName });
    } else if (userType === 'individual') {
      user = new Individual({ username, email, password });
    }

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// New endpoint for Google authentication
router.post('/google-auth', async (req, res) => {
  console.log("in the google auth")
  const { idToken } = req.body;

  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    
    // Find or create user in your database
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a new user in your database
      user = new User({
        email,
        username: name || email.split('@')[0],
        userType: 'individual', // Default user type
        googleId: uid,
        profilePicture: picture || '',
        // Don't set password for Google users
      });
      await user.save();
    } else if (!user.googleId) {
      // If existing user doesn't have googleId, update it
      user.googleId = uid;
      if (picture && !user.profilePicture) user.profilePicture = picture;
      await user.save();
    }

    // Generate JWT token with your app's secret
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(401).json({ error: error.message || 'Invalid Google token' });
  }
});
module.exports = router;
