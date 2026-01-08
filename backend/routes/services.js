const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services ORDER BY id ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Create new service (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, slug, description, price, duration_minutes } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        error: 'Title and description are required' 
      });
    }
    
    const serviceSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
    
    const [result] = await pool.query(
      'INSERT INTO services (title, slug, description, price, duration_minutes) VALUES (?, ?, ?, ?, ?)',
      [title, serviceSlug, description, price || 0, duration_minutes || 30]
    );
    
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const { title, slug, description, price, duration_minutes } = req.body;
    
    const [result] = await pool.query(
      'UPDATE services SET title = ?, slug = ?, description = ?, price = ?, duration_minutes = ? WHERE id = ?',
      [title, slug, description, price, duration_minutes, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({ success: true, message: 'Service updated' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM services WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
