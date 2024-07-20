<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

$judgeName = $_POST['judgeName'];
$judgePassword = $_POST['judgePassword']; 

// Validate input
if (empty($judgeName) || empty($judgePassword)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Encrypt password using MD5
$encryptedPassword = md5($judgePassword);

// Check if the judge already exists
$checkSql = "SELECT judgeID FROM judges WHERE judgeName = ?";
$checkStmt = $con->prepare($checkSql);
$checkStmt->bind_param('s', $judgeName);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Judge with this name already exists.']);
    $checkStmt->close();
    $con->close();
    exit;
}

$checkStmt->close();

// Prepare SQL statement to insert the new judge
$insertSql = "INSERT INTO judges (judgeName, judgePassword) VALUES (?, ?)";
$insertStmt = $con->prepare($insertSql);
$insertStmt->bind_param('ss', $judgeName, $encryptedPassword);

if ($insertStmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Judge added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add judge.']);
}

$insertStmt->close();
$con->close();
?>
