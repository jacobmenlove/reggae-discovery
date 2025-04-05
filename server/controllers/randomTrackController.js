const axios = require('axios');

function getRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

exports.getRandomTrack = async (req, res) => {
  try {
    const randomLetter = getRandomLetter();

    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: `reggae ${randomLetter}`, // forces iTunes to return a wider range
        entity: 'musicTrack',
        limit: 50,
      },
    });

    const reggaeTracks = response.data.results.filter(track => {
      const isReggae = track.primaryGenreName?.toLowerCase() === 'reggae';
      const year = new Date(track.releaseDate).getFullYear();
      return isReggae && year < 2026;
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
