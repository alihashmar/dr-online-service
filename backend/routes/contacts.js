const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all contact messages
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get single contact message
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contacts WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// Create new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required' 
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || '', message, 'new']
    );
    
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const [result] = await pool.query(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM contacts WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
