require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());

// Sync all models
sequelize.sync({ force: false }) // use true only for development (it drops & recreates tables)
  .then(() => console.log('✅ All tables created successfully'))
  .catch(err => console.error('❌ Error syncing tables:', err));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
