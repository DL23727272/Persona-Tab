<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; // Adjust the path to your database connection file

// Retrieve POST data
$judgeName = $_POST['judgeName'];
$categoryID = $_POST['judgeCategory']; // Assuming you pass categoryID for judge

// Validate input
if (empty($judgeName) || empty($categoryID)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Prepare SQL statement
$sql = "INSERT INTO judges (judgeName, categoryID) VALUES (?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param('si', $judgeName, $categoryID);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Judge added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add judge.']);
}

$stmt->close();
$con->close();
?>
