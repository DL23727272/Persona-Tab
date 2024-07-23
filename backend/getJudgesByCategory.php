<?php
include "../backend/myConnection.php";
header('Content-Type: application/json');

$categoryID = isset($_GET['categoryID']) ? intval($_GET['categoryID']) : 0;

if ($categoryID > 0) {
    // Join the judges table with judge_categories table
    $sql = "SELECT j.judgeID, j.judgeName 
            FROM judges j 
            INNER JOIN judge_categories jc ON j.judgeID = jc.judgeID 
            WHERE jc.categoryID = ?";
    
    $stmt = $con->prepare($sql);
    
    if ($stmt === false) {
        error_log("Prepare failed: " . htmlspecialchars($con->error));
        echo json_encode(['error' => 'Failed to prepare statement']);
        exit;
    }

    $stmt->bind_param("i", $categoryID);

    if (!$stmt->execute()) {
        error_log("Execute failed: " . htmlspecialchars($stmt->error));
        echo json_encode(['error' => 'Failed to execute statement']);
        exit;
    }

    $result = $stmt->get_result();
    $judges = [];
    while ($row = $result->fetch_assoc()) {
        $judges[] = $row;
    }
    
    echo json_encode($judges);
} else {
    echo json_encode(['error' => 'Invalid categoryID']);
}

$con->close();
?>
