<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 
if (isset($_POST['judgeID'])) {
    $judgeID = $_POST['judgeID'];

    // Start a transaction
    $con->begin_transaction();

    try {
        // Delete related records in scores table
        $sqlDeleteScores = "DELETE FROM scores WHERE judgeID = ?";
        $stmtScores = $con->prepare($sqlDeleteScores);
        $stmtScores->bind_param("i", $judgeID);
        $stmtScores->execute();
        $stmtScores->close();

        // Delete related records in judge_categories table
        $sqlDeleteJudgeCategories = "DELETE FROM judge_categories WHERE judgeID = ?";
        $stmtCategories = $con->prepare($sqlDeleteJudgeCategories);
        $stmtCategories->bind_param("i", $judgeID);
        $stmtCategories->execute();
        $stmtCategories->close();

        // Finally, delete the judge from judges table
        $sqlDeleteJudge = "DELETE FROM judges WHERE judgeID = ?";
        $stmtJudge = $con->prepare($sqlDeleteJudge);
        $stmtJudge->bind_param("i", $judgeID);
        $stmtJudge->execute();
        $stmtJudge->close();

        // Commit the transaction
        $con->commit();

        echo json_encode(['status' => 'success', 'message' => 'Judge and related data deleted successfully']);
    } catch (Exception $e) {
        // Rollback the transaction if something goes wrong
        $con->rollback();
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete judge: ' . $e->getMessage()]);
    }

    $con->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
