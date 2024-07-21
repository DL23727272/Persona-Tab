<?php
include "../backend/myConnection.php";

if (isset($_GET['judgeID'])) {
    $judgeID = $_GET['judgeID'];

    // Fetch scores for the judge
    $query = "SELECT scores.scoreID, scores.contestantID, scores.judgeID, scores.score, contestants.name, contestants.categoryID , scores.criterionID
              FROM scores
              JOIN contestants ON scores.contestantID = contestants.idContestant
              WHERE scores.judgeID = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('i', $judgeID);
    $stmt->execute();
    $result = $stmt->get_result();
    $scores = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['scores' => $scores]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Judge ID is missing']);
}
?>
