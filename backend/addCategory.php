<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

// Retrieve POST data
$categoryName = $_POST['categoryName'];
$eventID = $_POST['categoryEvent']; 

// Validate input
if (empty($categoryName) || empty($eventID)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Prepare SQL statement
$sql = "INSERT INTO categories (categoryName, eventID) VALUES (?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param('si', $categoryName, $eventID);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Category added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add category.']);
}

$stmt->close();
$con->close();
?>
