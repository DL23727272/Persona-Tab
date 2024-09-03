<?php
include "../backend/myConnection.php"; 

if (isset($_POST['judgeID']) && isset($_POST['categoryID'])) {
    $judgeID = $_POST['judgeID'];
    $categoryID = $_POST['categoryID'];

    mysqli_begin_transaction($con);

    try {
        $deleteJudgeCategoryQuery = "DELETE FROM judge_categories WHERE judgeID = ? AND categoryID = ?";
        if ($stmt = $con->prepare($deleteJudgeCategoryQuery)) {
            $stmt->bind_param("ii", $judgeID, $categoryID);
            if (!$stmt->execute()) {
                throw new Exception('Failed to execute judge-category delete query.');
            }
            $stmt->close();
        } else {
            throw new Exception('Failed to prepare judge-category delete statement.');
        }

        // Delete scores associated with the removed judge for that category
        $deleteScoresQuery = "DELETE FROM scores WHERE judgeID = ? AND categoryID = ?";
        if ($stmt = $con->prepare($deleteScoresQuery)) {
            $stmt->bind_param("ii", $judgeID, $categoryID);
            if (!$stmt->execute()) {
                throw new Exception('Failed to execute scores delete query.');
            }
            $stmt->close();
        } else {
            throw new Exception('Failed to prepare scores delete statement.');
        }

        // Commit the transaction
        mysqli_commit($con);

        echo json_encode(array('status' => 'success', 'message' => 'Judge removed from category and scores deleted.'));
    } catch (Exception $e) {
        // Roll back the transaction if any query fails
        mysqli_rollback($con);
        error_log("Error: " . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Judge ID or Category ID not provided.'));
}

$con->close();
?>
