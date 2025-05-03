const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  console.log('✅ Root route hit');
  res.send('Hello from test server!');
});

app.listen(PORT, () => {
  console.log(`🧪 Test server running at http://localhost:${PORT}`);
});
