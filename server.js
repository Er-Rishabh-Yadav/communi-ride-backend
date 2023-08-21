// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user)
    next();
  });
}
// app.use(authenticateToken)

// Define your routes here
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const dashRoutes = require('./routes/dashboard');

app.use('/api',apiRoutes);
app.use('/auth',authRoutes);    
app.use('/dash',authenticateToken,dashRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
