<?php
header('Content-Type: application/json');

include "../backend/myConnection.php";

// Decode scores from the POST request
$scores = json_decode($_POST['scores'], true);

if ($scores === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid data format.']);
    exit();
}

// Prepare SQL query for inserting or updating scores
$query = "
    INSERT INTO scores (judgeID, contestantID, categoryID, criterionID, score, rank)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        score = VALUES(score),
        rank = VALUES(rank);
";

$stmt = $con->prepare($query);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $con->error]);
    exit();
}

// Insert or update scores
foreach ($scores as $score) {
    $judgeID = isset($score['judgeID']) ? $score['judgeID'] : null;
    $contestantID = isset($score['contestantID']) ? $score['contestantID'] : null;
    $categoryID = isset($score['categoryID']) ? $score['categoryID'] : null;
    $criterionID = isset($score['criterionID']) ? $score['criterionID'] : null;
    $scoreValue = isset($score['score']) ? $score['score'] : null;
    $rank = isset($score['rank']) ? $score['rank'] : null;

    if ($judgeID !== null && $contestantID !== null && $categoryID !== null && $criterionID !== null) {
        $stmt->bind_param("iiiiii", $judgeID, $contestantID, $categoryID, $criterionID, $scoreValue, $rank);
        $stmt->execute();
    }
}

$stmt->close();

// Calculate total scores and ranks
$totalScoreQuery = "
    SELECT contestantID, categoryID, SUM(score) as totalScore
    FROM scores
    GROUP BY contestantID, categoryID
";

$totalScoreStmt = $con->prepare($totalScoreQuery);
$totalScoreStmt->execute();
$totalScoreStmt->store_result();
$totalScoreStmt->bind_result($contestantID, $categoryID, $totalScore);

$contestantsScores = [];
while ($totalScoreStmt->fetch()) {
    if (!isset($contestantsScores[$categoryID])) {
        $contestantsScores[$categoryID] = [];
    }
    $contestantsScores[$categoryID][$contestantID] = $totalScore;
}
$totalScoreStmt->free_result();
$totalScoreStmt->close();

// Update ranks per category
foreach ($contestantsScores as $categoryID => $scores) {
    arsort($scores); // Sort by score in descending order
    $rank = 1;
    foreach ($scores as $contestantID => $score) {
        $updateRankQuery = "UPDATE contestants SET rank = ? WHERE idContestant = ? AND categoryID = ?";
        $updateRankStmt = $con->prepare($updateRankQuery);
        $updateRankStmt->bind_param("iii", $rank, $contestantID, $categoryID);
        $updateRankStmt->execute();
        $updateRankStmt->close();
        $rank++;
    }
}

// Close connection
$con->close();
echo json_encode(['success' => true, 'message' => 'Scores updated successfully and ranks recalculated.']);
?>
