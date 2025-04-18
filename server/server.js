const express = require('express');
const cors = require('cors');
const path = require('path'); // Required for serving static files
const trackRoutes = require('./routes/trackRoutes');

const app = express();

// Use the port provided by Render or fallback to 9999 locally
const PORT = process.env.PORT || 9999;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', trackRoutes);

// Serve static files for the React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app (build folder)
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Handle all other routes (React Router) by serving index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Default Route for testing
app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
