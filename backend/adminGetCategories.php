<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

if (isset($_GET['eventID'])) {
    $eventID = intval($_GET['eventID']);
    $sql = "SELECT categoryID, categoryName FROM categories WHERE eventID = $eventID";
    $result = $con->query($sql);

    $categories = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row; // Collect the rows into an array
        }
        echo json_encode($categories); // Return the array as JSON
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No categories found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid event ID.']);
}

$con->close();
?>
