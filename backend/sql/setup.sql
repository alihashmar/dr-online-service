-- Healthcare Database Setup
-- Run this script to create the database and tables

CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'doctor', 'patient') DEFAULT 'patient',
    specialty VARCHAR(100) NULL,
    license_number VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    duration_minutes INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) NOT NULL,
    service_id INT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@healthcare.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE name = name;

-- Insert sample services
INSERT INTO services (title, slug, description, price, duration_minutes) VALUES 
('Doctor Registration', 'doctor-registration', 'Healthcare professionals can register and verify their credentials to share knowledge and engage with patients.', 0.00, 30),
('Patient Registration', 'patient-registration', 'Patients can create accounts to access medical information, participate in discussions, and connect with doctors.', 0.00, 15),
('Medical Consultation', 'medical-consultation', 'Online consultation with verified healthcare professionals for medical advice and guidance.', 50.00, 30),
('Health Checkup', 'health-checkup', 'Comprehensive health assessment and recommendations from medical experts.', 100.00, 60),
('Mental Health Support', 'mental-health-support', 'Connect with mental health professionals for counseling and support.', 75.00, 45),
('Disease Information', 'disease-information', 'Comprehensive database of diseases with symptoms, treatments, and latest research updates.', 0.00, 0)
ON DUPLICATE KEY UPDATE title = title;

-- Show created tables
SHOW TABLES;
