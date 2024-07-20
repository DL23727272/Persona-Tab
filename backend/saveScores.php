<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST;
    $judgeID = intval($data['judgeScore']);

    $success = true;

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        // Save scores
        foreach ($data as $key => $value) {
            if (strpos($key, 'score[') === 0) {
                preg_match('/score\[(\d+)\]\[(\d+)\]/', $key, $matches);
                $contestantID = intval($matches[1]);
                $criterionID = intval($matches[2]);
                $score = intval($value);

                $query = "REPLACE INTO scores (judgeID, contestantID, criterionID, score) VALUES (?, ?, ?, ?)";
                $stmt = mysqli_prepare($con, $query);
                mysqli_stmt_bind_param($stmt, 'iiii', $judgeID, $contestantID, $criterionID, $score);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);
            }
        }

        // Calculate total scores and ranks
        $rankingQuery = "
            SELECT contestantID, SUM(score) AS totalScore
            FROM scores
            WHERE judgeID = ?
            GROUP BY contestantID
            ORDER BY totalScore DESC";

        $rankingStmt = mysqli_prepare($con, $rankingQuery);
        mysqli_stmt_bind_param($rankingStmt, 'i', $judgeID);
        mysqli_stmt_execute($rankingStmt);
        mysqli_stmt_bind_result($rankingStmt, $contestantID, $totalScore);

        $ranks = [];
        $rank = 1;
        while (mysqli_stmt_fetch($rankingStmt)) {
            $ranks[$contestantID] = $rank++;
        }
        mysqli_stmt_close($rankingStmt);

        // Update contestants with ranks
        foreach ($ranks as $contestantID => $rank) {
            $updateQuery = "UPDATE contestants SET rank = ? WHERE idContestant = ?";
            $updateStmt = mysqli_prepare($con, $updateQuery);
            mysqli_stmt_bind_param($updateStmt, 'ii', $rank, $contestantID);
            mysqli_stmt_execute($updateStmt);
            mysqli_stmt_close($updateStmt);
        }

        mysqli_commit($con);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        mysqli_rollback($con);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    mysqli_close($con);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
