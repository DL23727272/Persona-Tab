<?php
include "../backend/myConnection.php";
header('Content-Type: application/json');

// Retrieve parameters from the GET request
$judgeID = isset($_GET['judgeID']) ? intval($_GET['judgeID']) : 0;
$categoryID = isset($_GET['categoryID']) ? intval($_GET['categoryID']) : 0;

if ($judgeID > 0 && $categoryID > 0) {
    // Query to fetch scores based on judgeID and categoryID
    $sql = "
        SELECT sc.contestantID, c.name AS contestantName, sc.score, cr.criteriaName
        FROM scores sc
        JOIN contestants c ON sc.contestantID = c.idContestant
        JOIN criteria cr ON sc.criterionID = cr.criteriaID
        WHERE sc.judgeID = ? AND sc.categoryID = ?
    ";

    $stmt = $con->prepare($sql);
    if ($stmt === false) {
        error_log("Prepare failed: " . htmlspecialchars($con->error));
        echo json_encode(['error' => 'Failed to prepare statement']);
        exit;
    }

    $stmt->bind_param("ii", $judgeID, $categoryID);

    if (!$stmt->execute()) {
        error_log("Execute failed: " . htmlspecialchars($stmt->error));
        echo json_encode(['error' => 'Failed to execute statement']);
        exit;
    }

    $result = $stmt->get_result();
    $scores = [];
    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }

    echo json_encode(['scores' => $scores]);
} else {
    echo json_encode(['error' => 'Invalid judgeID or categoryID']);
}

$con->close();
?>
