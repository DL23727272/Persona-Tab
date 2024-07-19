<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
file_put_contents('log.txt', json_encode($_POST) . "\n", FILE_APPEND);


// Retrieve POST data
$eventName = $_POST['eventName'];
$eventDescription = $_POST['eventDescription'];

// Validate input
if (empty($eventName) || empty($eventDescription)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Prepare SQL statement
$sql = "INSERT INTO events (eventName, eventDescription) VALUES (?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param('ss', $eventName, $eventDescription);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Event added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add event. Error: ' . $stmt->error]);
}

$stmt->close();
$con->close();
?>
