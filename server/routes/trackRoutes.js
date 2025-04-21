const express = require('express');
const router = express.Router();
const { getRandomTrack } = require('../controllers/randomTrackController');

router.get('/random-track', getRandomTrack);

router.get('/track/:id', (req, res) => {
  const trackId = req.params.id;
  res.json({ trackId }); 
});

module.exports = router;
