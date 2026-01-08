-- Dr. Online Healthcare Database
-- Database Name: healthcare_db (new)

CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Users table for admin login
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'doctor', 'patient') DEFAULT 'patient',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'fa-stethoscope',
    price DECIMAL(10,2) DEFAULT 0.00,
    duration_minutes INT DEFAULT 30,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) NOT NULL,
    patient_phone VARCHAR(20),
    service_id INT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@healthcare.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample services
INSERT INTO services (title, slug, description, icon, price, duration_minutes) VALUES 
('General Consultation', 'general-consultation', 'Basic health consultation with a general practitioner. Discuss symptoms, get medical advice, and receive treatment recommendations.', 'fa-user-md', 50.00, 30),
('Specialist Appointment', 'specialist-appointment', 'Consultation with a medical specialist for specific health concerns requiring expert attention.', 'fa-hospital', 120.00, 60),
('Mental Health', 'mental-health', 'Confidential mental health support with licensed therapists and psychiatrists.', 'fa-brain', 80.00, 45),
('Pediatric Care', 'pediatric', 'Specialized healthcare for infants, children, and adolescents.', 'fa-baby', 60.00, 30),
('Follow-up Visit', 'follow-up', 'Follow-up appointment to monitor progress and adjust treatment plans.', 'fa-notes-medical', 35.00, 20),
('Emergency Consultation', 'emergency', '24/7 urgent medical consultation for immediate health concerns.', 'fa-ambulance', 150.00, 30);

SELECT 'Database healthcare_db created successfully!' AS Status;
