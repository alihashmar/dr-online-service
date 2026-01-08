<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

$pdo = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get all active services or single service
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ? AND active = 1");
        $stmt->execute([$_GET['id']]);
        $service = $stmt->fetch();
        echo json_encode($service ?: ['error' => 'Service not found']);
    } elseif (isset($_GET['slug'])) {
        $stmt = $pdo->prepare("SELECT * FROM services WHERE slug = ? AND active = 1");
        $stmt->execute([$_GET['slug']]);
        $service = $stmt->fetch();
        echo json_encode($service ?: ['error' => 'Service not found']);
    } else {
        $stmt = $pdo->query("SELECT * FROM services WHERE active = 1 ORDER BY id");
        echo json_encode($stmt->fetchAll());
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
