<?php
include "../backend/myConnection.php"; 

if (isset($_POST['judgeID']) && isset($_POST['categoryID'])) {
    $judgeID = $_POST['judgeID'];
    $categoryID = $_POST['categoryID'];

    $query = "DELETE FROM judge_categories WHERE judgeID = ? AND categoryID = ?";
    
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("ii", $judgeID, $categoryID);
        if ($stmt->execute()) {
            echo json_encode(array('status' => 'success', 'message' => 'Judge removed from category.'));
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Failed to execute query.'));
        }
        $stmt->close();
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Failed to prepare statement.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Judge ID or Category ID not provided.'));
}

$con->close();
?>
