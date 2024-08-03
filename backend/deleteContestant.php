<?php
session_start();
include "../backend/myConnection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contestantID = $_POST['contestantID'];

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        // First, delete related scores
        $deleteScoresSQL = "DELETE FROM scores WHERE contestantID='$contestantID'";
        mysqli_query($con, $deleteScoresSQL);

        // Then, delete the contestant
        $deleteContestantSQL = "DELETE FROM contestants WHERE idContestant='$contestantID'";
        mysqli_query($con, $deleteContestantSQL);

        // Commit the transaction
        mysqli_commit($con);
        echo json_encode(["status" => "success", "message" => "Contestant deleted successfully"]);
    } catch (Exception $e) {
        // Rollback the transaction on error
        mysqli_rollback($con);
        echo json_encode(["status" => "error", "message" => "Error deleting contestant: " . $e->getMessage()]);
    }
}
?>
