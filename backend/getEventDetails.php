<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

if (isset($_GET['eventID'])) {
    $eventID = $_GET['eventID'];
    $query = "SELECT eventName, eventDescription, eventDate, eventID, eventImage FROM events WHERE eventID = $eventID";
    $result = $con->query($query);

    if ($result) {
        $event = $result->fetch_assoc();
        echo json_encode([$event]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Event not found']);
    }
}
?>
