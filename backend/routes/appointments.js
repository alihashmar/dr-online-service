const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, s.title as service_name 
      FROM appointments a 
      LEFT JOIN services s ON a.service_id = s.id 
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get single appointment
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, s.title as service_name 
      FROM appointments a 
      LEFT JOIN services s ON a.service_id = s.id 
      WHERE a.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { 
      patient_name, 
      patient_email, 
      service_id, 
      appointment_date, 
      appointment_time,
      notes 
    } = req.body;
    
    if (!patient_name || !patient_email || !appointment_date || !appointment_time) {
      return res.status(400).json({ 
        error: 'Patient name, email, date and time are required' 
      });
    }
    
    const [result] = await pool.query(
      `INSERT INTO appointments 
       (patient_name, patient_email, service_id, appointment_date, appointment_time, notes, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [patient_name, patient_email, service_id || null, appointment_date, appointment_time, notes || '', 'pending']
    );
    
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Update appointment status
router.put('/:id', async (req, res) => {
  try {
    const { status, appointment_date, appointment_time } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    let query = 'UPDATE appointments SET ';
    const params = [];
    const updates = [];
    
    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (appointment_date) {
      updates.push('appointment_date = ?');
      params.push(appointment_date);
    }
    if (appointment_time) {
      updates.push('appointment_time = ?');
      params.push(appointment_time);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }
    
    query += updates.join(', ') + ' WHERE id = ?';
    params.push(req.params.id);
    
    const [result] = await pool.query(query, params);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ success: true, message: 'Appointment updated' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM appointments WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router;
