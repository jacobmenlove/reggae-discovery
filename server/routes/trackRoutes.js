const express = require('express');
const router = express.Router();
const { getRandomTrack } = require('../controllers/randomTrackController');

// Define the route to get a random track
router.get('/random-track', getRandomTrack);

// Example of a route that expects an ID parameter (make sure this is correctly handled)
router.get('/track/:id', (req, res) => {
  const trackId = req.params.id;
  // Logic to fetch the track by ID (you can modify this as per your use case)
  res.json({ trackId });
});

module.exports = router;
