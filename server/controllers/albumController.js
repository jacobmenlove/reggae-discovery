const axios = require('axios');

exports.getRandomAlbum = async (req, res) => {
  try {
    // 1. Search for reggae albums on MusicBrainz
    const searchRes = await axios.get(
      'https://musicbrainz.org/ws/2/release/?query=tag:reggae&fmt=json&limit=50'
    );

    const releases = searchRes.data.releases;
    const random = releases[Math.floor(Math.random() * releases.length)];

    const albumTitle = random.title;
    const artist = random['artist-credit']?.[0]?.name || 'Unknown Artist';

    // 2. Search iTunes for album artwork + preview
    const iTunesRes = await axios.get(
      `https://itunes.apple.com/search`,
      {
        params: {
          term: `${artist} ${albumTitle}`,
          entity: 'album',
          limit: 1,
        },
      }
    );

    const iTunesData = iTunesRes.data.results[0] || {};

    // 3. Build response
    res.json({
      title: albumTitle,
      artist: artist,
      artwork: iTunesData.artworkUrl100?.replace('100x100', '600x600') || null,
      preview: iTunesData.previewUrl || null,
      tracks: ['Track 1', 'Track 2', 'Track 3'] // Placeholder until deeper API use
    });
  } catch (err) {
    console.error('Error fetching album:', err.message);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
};
