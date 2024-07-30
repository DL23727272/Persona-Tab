<?php
include "../backend/myConnection.php";  // Include your database connection

// Check if eventID is provided
if (isset($_POST['eventID'])) {
    $eventID = intval($_POST['eventID']);  // Sanitize input

    // Prepare query to get all categories for the event
    $queryCategories = "
        SELECT categoryID, categoryName
        FROM categories
        WHERE eventID = ?
    ";
    $stmtCategories = $con->prepare($queryCategories);
    $stmtCategories->bind_param("i", $eventID);
    $stmtCategories->execute();
    $resultCategories = $stmtCategories->get_result();

    // Prepare an array to hold category data
    $categories = array();
    while ($rowCategory = $resultCategories->fetch_assoc()) {
        $categories[] = $rowCategory;
    }

    // Prepare query to get scores for all categories in the event
    $queryScores = "
        SELECT c.name AS contestantName, s.score, j.judgeName, cat.categoryName, crit.criteriaName
        FROM scores s
        JOIN contestants c ON s.contestantID = c.idContestant
        JOIN judges j ON s.judgeID = j.judgeID
        JOIN categories cat ON s.categoryID = cat.categoryID
        JOIN criteria crit ON s.criterionID = crit.criteriaID
        WHERE s.categoryID IN (SELECT categoryID FROM categories WHERE eventID = ?)
    ";
    $stmtScores = $con->prepare($queryScores);
    $stmtScores->bind_param("i", $eventID);
    $stmtScores->execute();
    $resultScores = $stmtScores->get_result();

    // Collect data for all categories
    $scores = array();
    while ($rowScore = $resultScores->fetch_assoc()) {
        $scores[] = $rowScore;
    }

    // Return JSON response
    echo json_encode(array('success' => true, 'categories' => $categories, 'scores' => $scores));
} else {
    echo json_encode(array('success' => false, 'message' => 'Event ID is required'));
}
?>
