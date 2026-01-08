<?php
/**
 * ==========================================================
 * Database Configuration
 * ==========================================================
 * 
 * This file handles the MySQL database connection using PDO.
 * 
 * Database: healthcare_db
 * Tables: users, services, contacts, appointments
 * 
 * To change database credentials, update the constants below.
 * ==========================================================
 */

// ==========================================
// DATABASE CREDENTIALS
// ==========================================
define('DB_HOST', 'localhost');     // Database server (usually localhost)
define('DB_NAME', 'healthcare_db'); // Database name
define('DB_USER', 'root');          // Database username
define('DB_PASS', '');              // Database password (empty for XAMPP default)

// ==========================================
// DATABASE CONNECTION FUNCTION
// ==========================================
/**
 * Creates and returns a PDO database connection
 * 
 * @return PDO Database connection object
 * @throws PDOException If connection fails
 * 
 * Usage:
 *   $pdo = getConnection();
 *   $stmt = $pdo->query("SELECT * FROM services");
 */
function getConnection() {
    try {
        // Create PDO connection with UTF-8 support
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,        // Throw exceptions on error
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,   // Return associative arrays
                PDO::ATTR_EMULATE_PREPARES => false                  // Use real prepared statements
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        // Return error as JSON if connection fails
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}
?>
