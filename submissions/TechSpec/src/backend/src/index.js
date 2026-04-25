require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const interviewRoutes = require('./routes/interview');
const chatRoutes = require('./routes/chat');
const specRoutes = require('./routes/spec');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));

app.use(healthRoutes);
app.use(interviewRoutes);
app.use(chatRoutes);
app.use(specRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SpecForge backend running on port ${PORT}`);
});
