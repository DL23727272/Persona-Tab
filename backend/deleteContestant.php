<?php
session_start();
include "../backend/myConnection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contestantID = $_POST['contestantID'];

    $sql = "DELETE FROM contestants WHERE idContestant='$contestantID'";
    
    if (mysqli_query($con, $sql)) {
        echo json_encode(["status" => "success", "message" => "Contestant deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error deleting contestant"]);
    }
}
?>
