<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);

    // Fetch the categories assigned to the judge
    $categoriesQuery = "
        SELECT c.categoryID, c.categoryName
        FROM categories c
        JOIN judge_categories jc ON c.categoryID = jc.categoryID
        WHERE jc.judgeID = ?";
    
    $categoriesStmt = mysqli_prepare($con, $categoriesQuery);
    mysqli_stmt_bind_param($categoriesStmt, 'i', $judgeID);
    mysqli_stmt_execute($categoriesStmt);
    mysqli_stmt_bind_result($categoriesStmt, $categoryID, $categoryName);

    $categories = [];
    while (mysqli_stmt_fetch($categoriesStmt)) {
        $categories[] = [
            'categoryID' => $categoryID,
            'categoryName' => $categoryName
        ];
    }

    // Fetch criteria for the categories
    $criteriaQuery = "
        SELECT c.criteriaID, c.criteriaName, c.categoryID
        FROM criteria c
        WHERE c.categoryID IN (" . implode(',', array_map('intval', array_column($categories, 'categoryID'))) . ")";
    
    $criteriaStmt = mysqli_prepare($con, $criteriaQuery);
    mysqli_stmt_execute($criteriaStmt);
    mysqli_stmt_bind_result($criteriaStmt, $criteriaID, $criteriaName, $criteriaCategoryID);

    $criteria = [];
    while (mysqli_stmt_fetch($criteriaStmt)) {
        $criteria[] = [
            'criteriaID' => $criteriaID,
            'criteriaName' => $criteriaName,
            'categoryID' => $criteriaCategoryID
        ];
    }

    // Fetch contestants for the categories
    $contestantsQuery = "
        SELECT c.idContestant, c.name, c.categoryID
        FROM contestants c
        WHERE c.categoryID IN (" . implode(',', array_map('intval', array_column($categories, 'categoryID'))) . ")";
    
    $contestantsStmt = mysqli_prepare($con, $contestantsQuery);
    mysqli_stmt_execute($contestantsStmt);
    mysqli_stmt_bind_result($contestantsStmt, $contestantID, $name, $categoryID);

    $contestants = [];
    while (mysqli_stmt_fetch($contestantsStmt)) {
        $contestants[] = [
            'idContestant' => $contestantID,
            'name' => $name,
            'categoryID' => $categoryID
        ];
    }

    mysqli_stmt_close($categoriesStmt);
    mysqli_stmt_close($criteriaStmt);
    mysqli_stmt_close($contestantsStmt);
    mysqli_close($con);

    echo json_encode([
        'contestants' => $contestants,
        'criteria' => $criteria
    ]);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}
?>
