<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

// Retrieve POST data
$judgeID = $_POST['judgeID'];
$categoryID = $_POST['categoryJudgeSelect']; 

// Validate input
if (empty($judgeID) || empty($categoryID)) {
    echo json_encode(['status' => 'error', 'message' => 'Judge ID and Category ID are required.']);
    exit;
}

// Check if the judge is already assigned to the category
$checkSql = "SELECT * FROM judge_categories WHERE judgeID = ? AND categoryID = ?";
$checkStmt = $con->prepare($checkSql);
$checkStmt->bind_param('ii', $judgeID, $categoryID);
$checkStmt->execute();
$result = $checkStmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Judge is already assigned to this category.']);
    $checkStmt->close();
    $con->close();
    exit;
}

// Insert into judge_category table
$insertSql = "INSERT INTO judge_categories (judgeID, categoryID) VALUES (?, ?)";
$insertStmt = $con->prepare($insertSql);
$insertStmt->bind_param('ii', $judgeID, $categoryID);

if ($insertStmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Judge assigned to category successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to assign judge to category.']);
}

$insertStmt->close();
$checkStmt->close();
$con->close();
?>
