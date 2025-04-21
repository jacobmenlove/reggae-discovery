const express = require('express');
const router = express.Router();
const { getRandomTrack } = require('../controllers/randomTrackController');

// Define the route to get a random track
router.get('/random-track', getRandomTrack);

// Example of a route that expects an ID parameter
// Ensure you handle the route with a parameter correctly (e.g., /track/:id)
router.get('/track/:id', (req, res) => {
  const trackId = req.params.id;
  // Example logic to fetch track by ID (you can modify this as per your use case)
  res.json({ trackId });
});

module.exports = router;
