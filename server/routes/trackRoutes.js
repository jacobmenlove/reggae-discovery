const express = require('express');
const router = express.Router();
const { getRandomTrack } = require('../controllers/randomTrackController');

router.get('/random-track', (req, res, next) => {
  console.log('✅ /api/random-track route hit');
  return getRandomTrack(req, res, next);
});

module.exports = router;
