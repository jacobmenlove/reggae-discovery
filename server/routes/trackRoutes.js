const express = require('express');
const router = express.Router();
const { getRandomTrack } = require('../controllers/randomTrackController');

// Define API route
router.get('/random-track', getRandomTrack);

module.exports = router;
