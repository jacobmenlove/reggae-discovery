const express = require('express');
const path = require('path');
const cors = require('cors');
const trackRoutes = require('./routes/trackRoutes');  // Import your routes

const app = express();

// Use the port provided by Render, or default to 9999 for local
const PORT = process.env.PORT || 9999;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes - Ensure these routes are correctly set up with proper parameters
app.use('/api', trackRoutes);  // Handle API routes like /api/random-track

// Serve the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app (build directory)
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Ensure React Router works by handling all non-API routes
  // Serve index.html for any route that is not an API route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Default route for testing the backend
app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
