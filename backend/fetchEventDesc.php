<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

// Disable error display
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

// Retrieve POST data
$judgeID = isset($_POST['judgeID']) ? $_POST['judgeID'] : null;

// Validate input
if (empty($judgeID)) {
    echo json_encode(['status' => 'error', 'message' => 'Judge ID is required.']);
    exit;
}

// Update the SQL query according to your schema
$sql = "SELECT e.eventID, e.eventName, e.eventDescription, e.eventImage, e.eventDate, 
               e.bodyColor, e.heroBackgroundImage
        FROM events e
        JOIN categories c ON e.eventID = c.eventID
        JOIN judge_categories jc ON c.categoryID = jc.categoryID
        WHERE jc.judgeID = ?";

$stmt = $con->prepare($sql);
$stmt->bind_param('i', $judgeID); 

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $event = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'data' => $event]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No events found for this judge.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch event details.']);
}

$stmt->close();
$con->close();
?>
