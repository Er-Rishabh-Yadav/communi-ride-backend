// communityModel.js
const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rides: [
    {
      rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
