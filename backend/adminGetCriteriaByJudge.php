<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

$response = [];

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);
    $selectedCategoryID = isset($_GET['categoryID']) ? intval($_GET['categoryID']) : null;

    // Fetch the categories assigned to the judge
    $categoriesQuery = "
        SELECT c.categoryID, c.categoryName
        FROM categories c
        JOIN judge_categories jc ON c.categoryID = jc.categoryID
        WHERE jc.judgeID = ?";
    
    if ($categoriesStmt = mysqli_prepare($con, $categoriesQuery)) {
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
    } else {
        $response['error'] = 'Failed to prepare categories query.';
        echo json_encode($response);
        exit();
    }

    // Fetch criteria for the selected category if provided
    $criteriaQuery = "
        SELECT c.criteriaID, c.criteriaName, c.criteriaScore
        FROM criteria c
        WHERE c.categoryID = ?";
    
    if ($selectedCategoryID !== null) {
        if ($criteriaStmt = mysqli_prepare($con, $criteriaQuery)) {
            mysqli_stmt_bind_param($criteriaStmt, 'i', $selectedCategoryID);
        } else {
            $response['error'] = 'Failed to prepare criteria query.';
            echo json_encode($response);
            exit();
        }
    } else {
        // Fetch criteria for all categories
        $criteriaQuery = "
            SELECT c.criteriaID, c.criteriaName, c.criteriaScore
            FROM criteria c
            WHERE c.categoryID IN (" . implode(',', array_map('intval', array_column($categories, 'categoryID'))) . ")";
        
        if ($criteriaStmt = mysqli_prepare($con, $criteriaQuery)) {
            mysqli_stmt_execute($criteriaStmt);
            mysqli_stmt_bind_result($criteriaStmt, $criteriaID, $criteriaName, $criteriaScore);
        } else {
            $response['error'] = 'Failed to prepare criteria query for all categories.';
            echo json_encode($response);
            exit();
        }
    }

    if (isset($criteriaStmt)) {
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
    }

    // Determine category name
    $categoryName = 'All Categories';
    if ($selectedCategoryID) {
        foreach ($categories as $cat) {
            if ($cat['categoryID'] === $selectedCategoryID) {
                $categoryName = $cat['categoryName'];
                break;
            }
        }
    }

    // Return categories and criteria
    echo json_encode([
        'categories' => $categories,
        'criteria' => $criteria,
        'categoryName' => $categoryName
    ]);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}

mysqli_close($con);
?>
