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

    // ✅ Filter strictly for "Reggae" genre
    const reggaeTracks = response.data.results.filter(track => {
      const isReggae = track.primaryGenreName?.toLowerCase() === 'reggae';
      const year = new Date(track.releaseDate).getFullYear();
      const isOldSchool = year < 2000;
      return isReggae && isOldSchool;
    });
    

    if (!reggaeTracks.length) {
      return res.status(404).json({ error: 'No reggae genre tracks found' });
    }

    const random = reggaeTracks[Math.floor(Math.random() * reggaeTracks.length)];

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
    console.error('❌ Error fetching reggae track:', err.message);
    res.status(500).json({ error: 'Failed to fetch track' });
  }
};
