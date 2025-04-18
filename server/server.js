const express = require('express');
const cors = require('cors');
const path = require('path');
const trackRoutes = require('./routes/trackRoutes'); // Import the track routes

const app = express();
const PORT = process.env.PORT || 9999;  // Use Render's provided port or fallback to 9999 locally

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', trackRoutes); // Your API route

// Serve static files in production (React build)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Route all non-API requests to React's index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Default route to verify backend is working
app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
