const express = require('express');
const path = require('path');
const cors = require('cors');
const trackRoutes = require('./routes/trackRoutes');  
const app = express();

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());

app.use('/api', trackRoutes);  

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
