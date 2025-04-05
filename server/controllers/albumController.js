const axios = require('axios');

exports.getRandomAlbum = async (req, res) => {
  try {
    // Step 1: Search for 100 reggae releases (larger pool)
    const mbSearch = await axios.get(
      'https://musicbrainz.org/ws/2/release/?query=tag:reggae&fmt=json&limit=100',
      {
        headers: {
          'User-Agent': 'ReggaeDiscoveryApp/1.0.0 (jacobmenlove@example.com)',
        },
      }
    );

    const releases = mbSearch.data.releases;
    if (!releases || releases.length === 0) {
      return res.status(404).json({ error: 'No releases found' });
    }

    // Pick a new random album each time
    const randomIndex = Math.floor(Math.random() * releases.length);
    const random = releases[randomIndex];

    const releaseId = random.id;
    const albumTitle = random.title;
    const artist = random['artist-credit']?.[0]?.name || 'Unknown Artist';

    // Step 2: Get full tracklist from release
    const mbRelease = await axios.get(
      `https://musicbrainz.org/ws/2/release/${releaseId}?inc=recordings&fmt=json`,
      {
        headers: {
          'User-Agent': 'ReggaeDiscoveryApp/1.0.0 (jacobmenlove@example.com)',
        },
      }
    );

    const recordings = mbRelease.data.media?.flatMap((m) => m.tracks || []) || [];
    const tracks = recordings.map((track, index) => `${index + 1}. ${track.title}`);

    // Step 3: Use iTunes to search for the album or track preview
    const iTunesRes = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: `${artist} ${albumTitle}`,
        entity: 'musicTrack',
        limit: 1,
      },
    });

    const track = iTunesRes.data.results[0] || {};

    res.json({
      title: albumTitle,
      artist,
      artwork: track.artworkUrl100?.replace('100x100', '600x600') || '',
      preview: track.previewUrl || '',
      tracks,
    });
  } catch (err) {
    console.error('❌ Error fetching album:', err.message);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
};
