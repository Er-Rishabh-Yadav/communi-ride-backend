// routes/api.js
const express = require('express');
const router = express.Router();

// const authenticateToken = require('../server').authenticateToken;

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

router.get('/protected', (req, res) => {

  res.json({ message: 'Protected API call' });
});

// Add more endpoints as needed

module.exports = router;
