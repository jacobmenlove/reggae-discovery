const axios = require('axios');

exports.getRandomAlbum = async (req, res) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: 'bob marley',
        entity: 'album',
        limit: 1,
      },
    });

    const album = response.data.results[0] || {};

    res.json({
      title: album.collectionName || 'Unknown Album',
      artist: album.artistName || 'Unknown Artist',
      artwork: album.artworkUrl100?.replace('100x100', '600x600') || '',
      preview: album.previewUrl || '',
      tracks: ['Track A', 'Track B', 'Track C'],
    });
  } catch (err) {
    console.error('❌ Failed to fetch album:', err.message);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
};
