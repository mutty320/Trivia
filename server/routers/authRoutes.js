const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Individual, Institution } = require('../models/userSchema');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password, userType, institutionName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (userType === 'individual') {
      newUser = new Individual({ username, email, password: hashedPassword });
    } else if (userType === 'institution') {
      newUser = new Institution({ username, email, password: hashedPassword, institutionName });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
