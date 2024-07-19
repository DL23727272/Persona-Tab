<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

// Retrieve POST data
$criteriaName = $_POST['criteriaName'];
$categoryID = $_POST['criteriaCategory']; 
$criteriaScore = $_POST['criteriaScore'];
// Validate input
if (empty($criteriaName) || empty($categoryID) || empty($criteriaScore)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Prepare SQL statement
$sql = "INSERT INTO criteria (criteriaName, categoryID, criteriaScore) VALUES (?, ?, ?)";

$stmt = $con->prepare($sql);
$stmt->bind_param('sii', $criteriaName, $categoryID, $criteriaScore);


if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Criteria added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add criteria.']);
}

$stmt->close();
$con->close();
?>
