const express = require('express');
const router = express.Router();
const { testConnection } = require('../config/database');

// Health check endpoint
router.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus ? 'connected' : 'disconnected',
    server: 'running'
  });
});

module.exports = router;
