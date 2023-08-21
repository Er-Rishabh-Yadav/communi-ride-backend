// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// Simulated user database (replace with a real database)
const users = [];

// User registration
router.post('/register', async (req, res) => {
   const { username, password } = req.body;
    try {
        // Check if the username is already in use
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'Username already in use' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });

// User login and token generation
    // Find user in database
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          // Find the user by username
          const user = await User.findOne({ username });
          console.log(user)
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Compare the provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
          }
      
          // Create and sign a JWT token
          const accessToken = jwt.sign({ userId: user._id },process.env.SECRET_KEY, { expiresIn: '1h' });
      
          res.status(200).json({ accessToken });
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      });
      


module.exports = router;
