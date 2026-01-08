const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const healthRoutes = require('./routes/health');
const contactsRoutes = require('./routes/contacts');
const servicesRoutes = require('./routes/services');
const usersRoutes = require('./routes/users');
const appointmentsRoutes = require('./routes/appointments');

// Use routes
app.use('/api', healthRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Dr. Online Healthcare API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contacts: '/api/contacts',
      services: '/api/services',
      users: '/api/users',
      appointments: '/api/appointments'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
