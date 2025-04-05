const axios = require('axios');

exports.getRandomAlbum = async (req, res) => {
  try {
    // Step 1: Random offset for variety
    const offset = Math.floor(Math.random() * 100);

    // Step 2: Search reggae songs from iTunes
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: 'reggae',
        entity: 'musicTrack',
        limit: 1,
        offset: offset,
      },
    });

    const track = response.data.results[0];

    if (!track) {
      return res.status(404).json({ error: 'No reggae track found' });
    }

    res.json({
      title: track.trackName,
      artist: track.artistName,
      artwork: track.artworkUrl100?.replace('100x100', '600x600'),
      preview: track.previewUrl,
      tracks: [`1. ${track.trackName}`], // Just 1 song
    });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch reggae song' });
  }
};
