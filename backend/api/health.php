<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

try {
    $pdo = getConnection();
    echo json_encode([
        'status' => 'ok',
        'message' => 'Healthcare API is running!',
        'database' => 'connected',
        'db_name' => 'healthcare_db',
        'timestamp' => time(),
        'php_version' => PHP_VERSION
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'database' => 'disconnected'
    ]);
}
?>
