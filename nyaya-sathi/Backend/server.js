require('dotenv').config();
const express = require('express');
const cors = require('cors');

const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeRoute);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Nyaya-sathi Backend' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
