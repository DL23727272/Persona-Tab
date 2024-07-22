<?php
include "../backend/myConnection.php"; // Include your database connection file

$categoryID = $_POST['categoryID'];
$eventID = $_POST['eventID']; // Assuming you still need this

try {
    // Fetch criteria based on category
    $criteriaSql = "SELECT criteriaName FROM criteria WHERE categoryID = ?";
    $criteriaStmt = $con->prepare($criteriaSql);
    $criteriaStmt->bind_param("i", $categoryID);
    $criteriaStmt->execute();
    $criteriaResult = $criteriaStmt->get_result();

    $criteriaNames = [];
    while ($row = $criteriaResult->fetch_assoc()) {
        $criteriaNames[] = $row['criteriaName'];
    }

    // Fetch scores for each contestant
    $scoresSql = "SELECT 
                    j.judgeName,
                    c.name AS contestantName, 
                    cr.criteriaName AS criteriaName, 
                    sc.score
                  FROM 
                    scores sc
                  JOIN 
                    contestants c ON sc.contestantID = c.idContestant
                  JOIN 
                    criteria cr ON sc.criterionID = cr.criteriaID
                  JOIN 
                    judges j ON sc.judgeID = j.judgeID
                  WHERE 
                    sc.categoryID = ?
                  ORDER BY 
                    j.judgeName, c.name, cr.criteriaName";
    
    $scoresStmt = $con->prepare($scoresSql);
    $scoresStmt->bind_param("i", $categoryID);
    $scoresStmt->execute();
    $scoresResult = $scoresStmt->get_result();

    $scores = [];
    while ($row = $scoresResult->fetch_assoc()) {
        $judgeName = $row['judgeName'];
        $contestantName = $row['contestantName'];
        
        if (!isset($scores[$judgeName])) {
            $scores[$judgeName] = [];
        }
        if (!isset($scores[$judgeName][$contestantName])) {
            $scores[$judgeName][$contestantName] = [];
        }
        $scores[$judgeName][$contestantName][$row['criteriaName']] = $row['score'];
    }

    echo json_encode([
        'success' => true,
        'criteria' => $criteriaNames,
        'data' => $scores
    ]);
} catch (mysqli_sql_exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
