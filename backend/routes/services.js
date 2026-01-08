const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services ORDER BY id ASC'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// GET single service by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service'
    });
  }
});

// POST create new service
router.post('/', async (req, res) => {
  try {
    const { name, description, price, icon } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: 'Name and description are required'
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO services (name, description, price, icon) VALUES (?, ?, ?, ?)',
      [name, description, price || 0, icon || '🏥']
    );
    
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: {
        id: result.insertId,
        name,
        description,
        price,
        icon
      }
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service'
    });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, icon } = req.body;
    
    const [result] = await pool.query(
      'UPDATE services SET name = ?, description = ?, price = ?, icon = ? WHERE id = ?',
      [name, description, price, icon, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service'
    });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM services WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
});

module.exports = router;
