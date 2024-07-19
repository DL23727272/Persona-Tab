<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

$sql = "SELECT eventID, eventName FROM events";
$result = $con->query($sql);

$events = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row; // Collect the rows into an array
    }
    echo json_encode($events); // Return the array as JSON
} else {
    echo json_encode(['status' => 'error', 'message' => 'No events found.']);
}

$con->close();
?>
