const express = require('express');
const router = express.Router();
const { getRandomAlbum } = require('../controllers/albumController');

router.get('/random-album', getRandomAlbum);

module.exports = router;
