<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);

    // Fetch the categories assigned to the judge with their event dates
    $categoriesQuery = "
        SELECT c.categoryID, c.categoryName, e.eventDate
        FROM categories c
        JOIN judge_categories jc ON c.categoryID = jc.categoryID
        JOIN events e ON c.eventID = e.eventID
        WHERE jc.judgeID = ?";
    
    $categoriesStmt = mysqli_prepare($con, $categoriesQuery);
    mysqli_stmt_bind_param($categoriesStmt, 'i', $judgeID);
    mysqli_stmt_execute($categoriesStmt);
    mysqli_stmt_bind_result($categoriesStmt, $categoryID, $categoryName, $eventDate);

    $categories = [];
    while (mysqli_stmt_fetch($categoriesStmt)) {
        $categories[] = [
            'categoryID' => $categoryID,
            'categoryName' => $categoryName,
            'eventDate' => $eventDate
        ];
    }

    mysqli_stmt_close($categoriesStmt);

    // Fetch criteria for the categories
    $categoryIDs = array_column($categories, 'categoryID');
    if (count($categoryIDs) > 0) {
        $criteriaQuery = "
            SELECT c.criteriaID, c.criteriaName, c.categoryID, c.criteriaScore
            FROM criteria c
            WHERE c.categoryID IN (" . implode(',', array_map('intval', $categoryIDs)) . ")";
        
        $criteriaStmt = mysqli_prepare($con, $criteriaQuery);
        mysqli_stmt_execute($criteriaStmt);
        mysqli_stmt_bind_result($criteriaStmt, $criteriaID, $criteriaName, $criteriaCategoryID, $criteriaScore);

        $criteria = [];
        while (mysqli_stmt_fetch($criteriaStmt)) {
            $criteria[] = [
                'criteriaID' => $criteriaID,
                'criteriaName' => $criteriaName,
                'categoryID' => $criteriaCategoryID,
                'criteriaScore' => $criteriaScore
            ];
        }

        mysqli_stmt_close($criteriaStmt);
    } else {
        $criteria = [];
    }

    // Return categories and criteria
    echo json_encode([
        'categories' => $categories,
        'criteria' => $criteria
    ]);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}

mysqli_close($con);
?>
