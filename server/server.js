const express = require('express');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');

const app = express();
const PORT = 5050;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api', albumRoutes);

app.get('/', (req, res) => {
  res.send('🎧 Reggae Discovery Backend is Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
