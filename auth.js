// auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Example: User login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are valid
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create and send JWT token upon successful login
  const token = jwt.sign({ username: user.username }, 'your_secret_key');
  res.json({ token });
});

// Example: Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { router, verifyToken };
