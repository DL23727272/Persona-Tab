<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; // Adjust the path to your database connection file

// Retrieve POST data
$judgeName = $_POST['judgeName'];
$categoryID = $_POST['judgeCategory']; // Assuming you pass categoryID for judge
$judgePassword = $_POST['judgePassword']; // Retrieve password input

// Validate input
if (empty($judgeName) || empty($categoryID) || empty($judgePassword)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Encrypt password using MD5
$encryptedPassword = md5($judgePassword);

// Check if the judge already exists
$checkSql = "SELECT judgeID FROM judges WHERE judgeName = ? AND categoryID = ?";
$checkStmt = $con->prepare($checkSql);
$checkStmt->bind_param('si', $judgeName, $categoryID);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Judge with this name already exists in the selected category.']);
    $checkStmt->close();
    $con->close();
    exit;
}

$checkStmt->close();

// Prepare SQL statement to insert the new judge

$insertSql = "INSERT INTO judges (judgeName, categoryID, judgePassword) VALUES (?, ?, ?)";
$insertStmt = $con->prepare($insertSql);
$insertStmt->bind_param('sis', $judgeName, $categoryID, $encryptedPassword);

if ($insertStmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Judge added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add judge.']);
}

$insertStmt->close();
$con->close();
?>
