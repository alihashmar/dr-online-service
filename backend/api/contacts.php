<?php
/**
 * ==========================================================
 * Contacts API Endpoint
 * ==========================================================
 * 
 * Handles contact form messages (CRUD operations)
 * 
 * Endpoints:
 *   GET    /contacts.php       - List all contacts
 *   GET    /contacts.php?id=1  - Get single contact
 *   POST   /contacts.php       - Submit new message
 *   PUT    /contacts.php       - Update contact status
 *   DELETE /contacts.php       - Delete contact
 * 
 * ==========================================================
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Get database connection
$pdo = getConnection();

// Get HTTP method (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // ==========================================
    // GET - Retrieve contacts
    // ==========================================
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single contact by ID
            $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $contact = $stmt->fetch();
            echo json_encode($contact ?: ['error' => 'Contact not found']);
        } else {
            // Get all contacts (newest first)
            $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll());
        }
        break;

    // ==========================================
    // POST - Create new contact message
    // ==========================================
    case 'POST':
        // Read JSON data from request body
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and message are required']);
            exit;
        }

        // Insert into database
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['subject'] ?? 'General Inquiry',
            $data['message']
        ]);

        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Your message has been sent successfully!',
            'id' => $pdo->lastInsertId()
        ]);
        break;

    // ==========================================
    // PUT - Update contact status
    // ==========================================
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['id']) || empty($data['status'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID and status are required']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE contacts SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Contact updated']);
        break;

    // ==========================================
    // DELETE - Remove contact
    // ==========================================
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Contact deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
