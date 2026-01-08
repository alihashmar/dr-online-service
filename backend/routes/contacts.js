const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts'
    });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contacts WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact'
    });
  }
});

// POST create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || '', message]
    );
    
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: {
        id: result.insertId,
        name,
        email,
        subject,
        message
      }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// DELETE contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM contacts WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact'
    });
  }
});

module.exports = router;
