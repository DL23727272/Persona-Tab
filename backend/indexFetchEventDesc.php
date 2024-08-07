<?php
include "../backend/myConnection.php";


$sql = "SELECT eventID, eventName, eventDate, eventDescription, eventImage FROM events";
$result = mysqli_query($con, $sql);

$events = array();

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $events[] = $row;
    }
    echo json_encode(array('status' => 'success', 'data' => $events));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'No events found.'));
}

mysqli_close($con);
?>
