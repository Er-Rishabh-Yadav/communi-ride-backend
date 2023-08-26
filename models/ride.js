// rideModel.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields relevant to a ride here
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
