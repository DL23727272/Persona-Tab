<?php
include "../backend/myConnection.php"; 
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $criteriaID = $_POST['criteriaID'];
    $criteriaName = $_POST['editCriteriaName'];
    $criteriaScore = $_POST['editCriteriaScore'];

    $sql = "UPDATE criteria SET criteriaName = ?, criteriaScore = ? WHERE criteriaID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssi", $criteriaName, $criteriaScore, $criteriaID);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update criteria.']);
    }
}
?>
