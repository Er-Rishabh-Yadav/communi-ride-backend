// routes/api.js
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

// Add more endpoints as needed

module.exports = router;
