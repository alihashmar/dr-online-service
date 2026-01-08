-- ================================================
-- Dr. Online Healthcare Database Setup
-- Run this in phpMyAdmin to create the database
-- ================================================

-- Create database
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'doctor', 'admin') DEFAULT 'user',
    api_token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) DEFAULT '',
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    icon VARCHAR(50) DEFAULT '🏥',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) NOT NULL,
    service_id INT DEFAULT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes TEXT DEFAULT '',
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Insert default services
INSERT INTO services (name, description, price, icon) VALUES
('General Consultation', 'General health consultation with experienced doctors', 50.00, '👨‍⚕️'),
('Specialist Consultation', 'Consultation with specialist doctors in various fields', 100.00, '🩺'),
('Lab Tests', 'Comprehensive laboratory testing and diagnostics', 75.00, '🔬'),
('Mental Health', 'Professional mental health support and counseling', 80.00, '🧠'),
('Pediatric Care', 'Specialized healthcare for children and infants', 60.00, '👶'),
('Emergency Care', '24/7 emergency medical services', 150.00, '🚑');

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@dronline.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Show tables
SHOW TABLES;
