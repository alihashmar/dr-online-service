const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments ORDER BY appointment_date DESC'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
});

// GET appointments by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC',
      [req.params.userId]
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
});

// GET single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment'
    });
  }
});

// POST create new appointment
router.post('/', async (req, res) => {
  try {
    const { user_id, patient_name, patient_email, service_id, appointment_date, appointment_time, notes } = req.body;
    
    // Validation
    if (!patient_name || !patient_email || !appointment_date || !appointment_time) {
      return res.status(400).json({
        success: false,
        error: 'Patient name, email, date, and time are required'
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO appointments (user_id, patient_name, patient_email, service_id, appointment_date, appointment_time, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id || null, patient_name, patient_email, service_id || null, appointment_date, appointment_time, notes || '', 'pending']
    );
    
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        id: result.insertId,
        patient_name,
        patient_email,
        appointment_date,
        appointment_time,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to book appointment'
    });
  }
});

// PUT update appointment status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const [result] = await pool.query(
      'UPDATE appointments SET status = ?, notes = ? WHERE id = ?',
      [status, notes, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Appointment updated successfully'
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update appointment'
    });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM appointments WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete appointment'
    });
  }
});

module.exports = router;
