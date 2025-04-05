const express = require('express');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow cross-origin requests from React dev server
app.use(cors({
  origin: 'http://localhost:3000',
}));

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Route for /api/random-album
app.use('/api', albumRoutes);

// ✅ Fallback route for debugging
app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
