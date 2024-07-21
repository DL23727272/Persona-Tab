<?php
include "../backend/myConnection.php";

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve POST data
$scores = isset($_POST['scores']) ? json_decode($_POST['scores'], true) : [];

// Prepare SQL queries
$checkQuery = "SELECT COUNT(*) FROM scores WHERE judgeID = ? AND contestantID = ? AND categoryID = ? AND criterionID = ?";
$insertQuery = "INSERT INTO scores (judgeID, contestantID, categoryID, criterionID, score, rank) VALUES (?, ?, ?, ?, ?, ?)";
$updateQuery = "UPDATE scores SET score = ?, rank = ? WHERE judgeID = ? AND contestantID = ? AND categoryID = ? AND criterionID = ?";

$stmtCheck = $con->prepare($checkQuery);
$stmtInsert = $con->prepare($insertQuery);
$stmtUpdate = $con->prepare($updateQuery);

if (!$stmtCheck || !$stmtInsert || !$stmtUpdate) {
    echo json_encode(['success' => false, 'error' => 'Database prepare failed: ' . $con->error]);
    exit;
}

// Flag to check if the judge has already voted
$judgeVoted = false;

// Iterate through each score data and execute the query
foreach ($scores as $score) {
    $judgeID = $score['judgeID'];
    $contestantID = $score['contestantID'];
    $categoryID = $score['categoryID'];
    $criterionID = $score['criterionID'];
    $scoreValue = $score['score'];
    $rank = $score['rank'];

    // Check if the score already exists
    $stmtCheck->bind_param("iiii", $judgeID, $contestantID, $categoryID, $criterionID);
    $stmtCheck->execute();
    $stmtCheck->store_result(); // Ensure results are stored
    $stmtCheck->bind_result($count);
    $stmtCheck->fetch();
    $stmtCheck->free_result(); // Free the result set after fetching

    if ($count > 0) {
        // Score exists, set the flag to true
        $judgeVoted = true;
    } else {
        // Score does not exist, insert it
        $stmtInsert->bind_param("iiisis", $judgeID, $contestantID, $categoryID, $criterionID, $scoreValue, $rank);
        if (!$stmtInsert->execute()) {
            echo json_encode(['success' => false, 'error' => 'Insert failed: ' . $stmtInsert->error]);
            exit;
        }
    }
}

// If the judge has already voted, return a specific response
if ($judgeVoted) {
    echo json_encode(['success' => false, 'message' => 'You have already voted.']);
} else {
    // Calculate total scores and ranks
    $totalScoreQuery = "
        SELECT contestantID, SUM(score) as totalScore
        FROM scores
        WHERE categoryID IN (SELECT categoryID FROM judges WHERE judgeID = ?)
        GROUP BY contestantID
        ORDER BY totalScore DESC
    ";

    $totalScoreStmt = $con->prepare($totalScoreQuery);
    $totalScoreStmt->bind_param("i", $judgeID);
    $totalScoreStmt->execute();
    $totalScoreStmt->store_result();
    $totalScoreStmt->bind_result($contestantID, $totalScore);

    $contestantsScores = [];
    while ($totalScoreStmt->fetch()) {
        $contestantsScores[$contestantID] = $totalScore;
    }
    $totalScoreStmt->free_result();
    $totalScoreStmt->close();

    // Calculate ranks and update contestant records
    $rank = 1;
    foreach ($contestantsScores as $contestantID => $score) {
        $updateRankQuery = "UPDATE contestants SET rank = ? WHERE idContestant = ?";
        $updateRankStmt = $con->prepare($updateRankQuery);
        $updateRankStmt->bind_param("ii", $rank, $contestantID);
        $updateRankStmt->execute();
        $updateRankStmt->close();
        $rank++;
    }

    // Close statements and connection
    $stmtCheck->close();
    $stmtInsert->close();
    $stmtUpdate->close();
    $con->close();

    // Success response
    echo json_encode(['success' => true, 'message' => 'Scores saved successfully and ranks updated.']);
}
?>
