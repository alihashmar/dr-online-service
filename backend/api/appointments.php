<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

$pdo = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all appointments or filter by status/date
        $sql = "SELECT a.*, s.title as service_title FROM appointments a 
                LEFT JOIN services s ON a.service_id = s.id";
        $params = [];
        
        if (isset($_GET['status'])) {
            $sql .= " WHERE a.status = ?";
            $params[] = $_GET['status'];
        }
        
        $sql .= " ORDER BY a.appointment_date DESC, a.appointment_time DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        // Create new appointment
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['patient_name']) || empty($data['patient_email']) || 
            empty($data['appointment_date']) || empty($data['appointment_time'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Patient name, email, date, and time are required']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO appointments (patient_name, patient_email, patient_phone, service_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['patient_name'],
            $data['patient_email'],
            $data['patient_phone'] ?? null,
            $data['service_id'] ?? null,
            $data['appointment_date'],
            $data['appointment_time'],
            $data['notes'] ?? null
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Appointment booked successfully!',
            'id' => $pdo->lastInsertId()
        ]);
        break;

    case 'PUT':
        // Update appointment status
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['id']) || empty($data['status'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID and status are required']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE appointments SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Appointment updated']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM appointments WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Appointment deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
