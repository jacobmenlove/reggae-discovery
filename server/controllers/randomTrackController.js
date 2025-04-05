const axios = require('axios');

exports.getRandomTrack = async (req, res) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: 'reggae',
        entity: 'musicTrack',
        limit: 50,
      },
    });

    const tracks = response.data.results;
    if (!tracks || tracks.length === 0) {
      return res.status(404).json({ error: 'No reggae tracks found' });
    }

    const random = tracks[Math.floor(Math.random() * tracks.length)];

    const durationMillis = random.trackTimeMillis || 0;
    const durationFormatted = `${Math.floor(durationMillis / 60000)}:${String(
      Math.floor((durationMillis % 60000) / 1000)
    ).padStart(2, '0')}`;

    res.json({
      title: random.trackName,
      artist: random.artistName,
      album: random.collectionName,
      genre: random.primaryGenreName,
      duration: durationFormatted,
      artwork: random.artworkUrl100?.replace('100x100', '600x600'),
      preview: random.previewUrl,
    });
  } catch (err) {
    console.error('❌ Error fetching track:', err.message);
    res.status(500).json({ error: 'Failed to fetch track' });
  }
};
