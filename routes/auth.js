// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simulated user database (replace with a real database)
const users = [];

// User registration
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    console.log(user);
    res.status(201).send();
  } catch {
    res.status(500).send("Error registering new user please try again.");
  }
});

// User login and token generation
router.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user == null) return res.status(400).send('User not found');
  
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, 'your-secret-key');
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
