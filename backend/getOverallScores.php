<?php
include "../backend/myConnection.php";

// Check if eventID is provided
if (isset($_POST['eventID'])) {
    $eventID = intval($_POST['eventID']);  // Sanitize input
    $categoryID = isset($_POST['categoryID']) ? intval($_POST['categoryID']) : null;

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

    // Check if a categoryID was selected
    $selectedCategoryName = '';
    if ($categoryID) {
        // Fetch the name of the selected category
        foreach ($categories as $category) {
            if ($category['categoryID'] == $categoryID) {
                $selectedCategoryName = $category['categoryName'];
                break;
            }
        }
    }

    // Prepare query to get scores for the selected category or all categories
    $queryScores = "
        SELECT c.contestantNo, c.name AS contestantName, c.gender, s.score, j.judgeName, cat.categoryName, crit.criteriaName, s.categoryID
        FROM scores s
        JOIN contestants c ON s.contestantID = c.idContestant
        JOIN judges j ON s.judgeID = j.judgeID
        JOIN categories cat ON s.categoryID = cat.categoryID
        JOIN criteria crit ON s.criterionID = crit.criteriaID
        WHERE s.categoryID IN (SELECT categoryID FROM categories WHERE eventID = ?)
    ";
    if ($categoryID) {
        $queryScores .= " AND s.categoryID = ?";
    }
    $stmtScores = $con->prepare($queryScores);

    // Bind parameters to the statement
    if ($categoryID) {
        $stmtScores->bind_param("ii", $eventID, $categoryID);  // Two integers
    } else {
        $stmtScores->bind_param("i", $eventID);  // One integer
    }

    $stmtScores->execute();
    $resultScores = $stmtScores->get_result();

    // Collect data for all categories
    $scores = array();
    while ($rowScore = $resultScores->fetch_assoc()) {
        $scores[] = $rowScore;
    }

    // Return JSON response
    echo json_encode(array(
        'success' => true,
        'selectedCategoryName' => $selectedCategoryName,
        'categories' => $categories,
        'scores' => $scores
    ));
} else {
    echo json_encode(array('success' => false, 'message' => 'Event ID is required'));
}
?>
