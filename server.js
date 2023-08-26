// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./helper/dbconfig');
const socket = require("socket.io");
// Middleware
app.use(bodyParser.json());
connectDB();
// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (token == null) return res.sendStatus(401);

  jwt.verify(token,process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user)
    next();
  });
}
// app.use(authenticateToken)

// Define your routes here
const messageRoutes = require('./routes/message');
const authRoutes = require('./routes/auth');
const commRoutes = require('./routes/community');

app.use('/message',messageRoutes);
app.use('/auth',authRoutes);    
app.use('/comm',commRoutes);

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});