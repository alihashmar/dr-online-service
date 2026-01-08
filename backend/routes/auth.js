const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

// POST Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }
    
    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate API token
    const apiToken = require('crypto').randomBytes(32).toString('hex');
    
    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, api_token) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'user', apiToken]
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: result.insertId,
        name,
        email,
        role: role || 'user'
      },
      token: apiToken
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register user'
    });
  }
});

// POST Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    const user = users[0];
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Generate new API token
    const apiToken = require('crypto').randomBytes(32).toString('hex');
    
    // Update user's API token
    await pool.query(
      'UPDATE users SET api_token = ? WHERE id = ?',
      [apiToken, user.id]
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: apiToken
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to login'
    });
  }
});

// GET current user (requires token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const [users] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE api_token = ?',
      [token]
    );
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
    
    res.json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// POST Logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      // Clear user's API token
      await pool.query(
        'UPDATE users SET api_token = NULL WHERE api_token = ?',
        [token]
      );
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to logout'
    });
  }
});

module.exports = router;
