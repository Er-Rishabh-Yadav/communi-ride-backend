// communityController.js
const Community = require('../models/community'); // Assuming you have a Community model
const User = require('../models/user'); // Assuming you have a User model
const Ride = require('../models/ride'); // Assuming you have a Ride model
// Create a new community
exports.createCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    const community = new Community({ name });
    await community.save();
    res.status(201).json({ message: 'Community created successfully', community });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the community' });
  }
};

// communityController.js
// ... (other imports and code)

exports.createRide = async (req, res) => {
  try {
    const { communityId, userId, distance } = req.body;
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Create a new ride document (assuming you have a Ride model)
    const newRide = new Ride({ community: communityId, user: userId, distance });
    await newRide.save();

    // Update the community's rides array with the new ride
    community.rides.push({ rideId: newRide._id });

    // Save the community
    await community.save();

    // ... (logic to determine if the ride was successful)

    // Mark the ride as completed in the community
    const rideIndex = community.rides.findIndex((ride) => ride.rideId.equals(newRide._id));
    if (rideIndex !== -1) {
      community.rides[rideIndex].completed = false;
      await community.save();
    }

    res.json({ message: 'Ride created and marked as uncompleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the ride' });
  }
};

// communityController.js
exports.addUserToCommunity = async (req, res) => {
  try {
    const { communityId, userId } = req.body;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    community.users.push(user._id);
    await community.save();

    res.json({ message: 'User added to community successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the user to the community' });
  }
};

// communityController.js
exports.getUsersInCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId).populate('users', 'username email'); // Populate the users field and select specific fields

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    res.json(community.users);
  } catch (error) {
    console.log("error while getting users in community "+error);
    res.status(500).json({ error: 'An error occurred while fetching users in the community' });
  }
};


// communityController.js
exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching communities' });
  }
};

// communityController.js
exports.getAllRidesInCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId).populate('rides.rideId');

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const rides = community.rides.map((ride) => ride.rideId);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching rides in the community' });
  }
};

