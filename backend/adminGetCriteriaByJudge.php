<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);
    $selectedCategoryID = isset($_GET['categoryID']) ? intval($_GET['categoryID']) : null;

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

    mysqli_stmt_close($categoriesStmt);

    // Fetch criteria for the selected category if provided
    $criteriaQuery = "
        SELECT c.criteriaID, c.criteriaName, c.criteriaScore
        FROM criteria c
        WHERE c.categoryID = ?";
    
    $criteriaStmt = mysqli_prepare($con, $criteriaQuery);
    if ($selectedCategoryID !== null) {
        mysqli_stmt_bind_param($criteriaStmt, 'i', $selectedCategoryID);
    } else {
        // If no categoryID is selected, fetch criteria for all categories
        $criteriaQuery = "
            SELECT c.criteriaID, c.criteriaName, c.criteriaScore
            FROM criteria c
            WHERE c.categoryID IN (" . implode(',', array_map('intval', array_column($categories, 'categoryID'))) . ")";
        $criteriaStmt = mysqli_prepare($con, $criteriaQuery);
    }

    mysqli_stmt_execute($criteriaStmt);
    mysqli_stmt_bind_result($criteriaStmt, $criteriaID, $criteriaName, $criteriaScore);

    $criteria = [];
    while (mysqli_stmt_fetch($criteriaStmt)) {
        $criteria[] = [
            'criteriaID' => $criteriaID,
            'criteriaName' => $criteriaName,
            'criteriaScore' => $criteriaScore
        ];
    }

    mysqli_stmt_close($criteriaStmt);

    // Return categories and criteria
    echo json_encode([
        'categories' => $categories,
        'criteria' => $criteria,
        'categoryName' => $selectedCategoryID ? array_column(array_filter($categories, function ($cat) use ($selectedCategoryID) {
            return $cat['categoryID'] === $selectedCategoryID;
        }), 'categoryName')[0] ?? 'No Category Found' : 'All Categories'
    ]);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}

mysqli_close($con);
?>
