const express = require('express');
const cors = require('cors');
const trackRoutes = require('./routes/trackRoutes');

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

app.use('/api', trackRoutes);

app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

app.listen(PORT, () => {
  console.log('🚀 Server running at http://localhost:' + PORT);
});
