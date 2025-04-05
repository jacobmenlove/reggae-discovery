const axios = require('axios');

const searchTerms = [
  "reggae", "roots reggae", "dub", "rocksteady", "dancehall", "ska",
  "marley", "toots", "burning spear", "bunny wailer", "lee perry",
  "riddim", "kingston", "jamaica", "one love", "irie", "selector"
];

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

exports.getRandomTrack = async (req, res) => {
  try {
    // Pick a random search term from the list
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

    // Fetch tracks from iTunes API
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: randomTerm,
        entity: 'musicTrack',
        limit: 50,  // You can increase the limit if you'd like to grab more results
      },
    });

    // Filter tracks to only include reggae and roots reggae
    const filteredTracks = response.data.results.filter(track => {
      const genre = track.primaryGenreName?.toLowerCase() || '';
      return genre.includes('reggae') || genre.includes('roots');
    });

    if (!filteredTracks.length) {
      return res.status(404).json({ error: 'No reggae tracks found' });
    }

    // Shuffle the tracks and pick a random one
    const shuffled = shuffleArray(filteredTracks);
    const random = shuffled[0];

    // Calculate duration
    const durationMillis = random.trackTimeMillis || 0;
    const durationFormatted = `${Math.floor(durationMillis / 60000)}:${String(
      Math.floor((durationMillis % 60000) / 1000)
    ).padStart(2, '0')}`;

    // Send the track data as response
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
