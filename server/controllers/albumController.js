const axios = require('axios');

exports.getRandomAlbum = async (req, res) => {
  try {
    // ✅ 1. Fetch reggae albums from MusicBrainz
    const musicBrainzRes = await axios.get(
      'https://musicbrainz.org/ws/2/release/?query=tag:reggae&fmt=json&limit=50',
      {
        headers: {
          'User-Agent': 'ReggaeDiscoveryApp/1.0.0 (jonny.cake444@gmail.com)',
        },
      }
    );

    const releases = musicBrainzRes.data.releases;
    if (!releases || releases.length === 0) {
      return res.status(404).json({ error: 'No albums found in MusicBrainz' });
    }

    const random = releases[Math.floor(Math.random() * releases.length)];

    const albumTitle = random.title;
    const artist = random['artist-credit']?.[0]?.name || 'Unknown Artist';

    console.log(`🎯 Selected: ${artist} – ${albumTitle}`);

    // ✅ 2. Fetch album artwork + preview from iTunes
    const iTunesRes = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: `${artist} ${albumTitle}`,
        entity: 'album',
        limit: 1,
      },
    });

    const iTunesAlbum = iTunesRes.data.results[0] || {};

    // ✅ 3. Respond with combined album data
    res.json({
      title: albumTitle,
      artist,
      artwork: iTunesAlbum.artworkUrl100?.replace('100x100', '600x600') || null,
      preview: iTunesAlbum.previewUrl || null,
      tracks: ['Track 1', 'Track 2', 'Track 3'], // Placeholder
    });
  } catch (err) {
    console.error('❌ Error in getRandomAlbum:', err.message);
    res.status(500).json({ error: 'Failed to fetch album data' });
  }
};
