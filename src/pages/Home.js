import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to Doctor Appointment System</h1>
      <p>Browse doctors, book appointments, and view your bookings.</p>
      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Link to="/doctors"><button>View Doctors</button></Link>
        <Link to="/dashboard"><button>My Appointments</button></Link>
      </div>
    </div>
  );
};

export default Home;
