const express = require('express');
const router = express.Router();
const { pool, testConnection } = require('../config/database');

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    
    res.json({
      success: true,
      status: 'OK',
      message: 'Dr. Online API is running',
      database: dbConnected ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message
    });
  }
});

module.exports = router;
