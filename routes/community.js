// communityRoutes.js
const express = require('express');
const router = express.Router();
const communityController = require('../controller/communityController');

// Create a new community
router.post('/create-community', communityController.createCommunity);

// Create a new ride within a community
router.post('/create-ride', communityController.createRide);

// Add user to a community
router.post('/add-user-to-community', communityController.addUserToCommunity);


// Get users in a community
router.get('/community/:communityId/users', communityController.getUsersInCommunity);


router.get('/communities', communityController.getAllCommunities);

router.get('/community/:communityId/rides', communityController.getAllRidesInCommunity);


module.exports = router;
