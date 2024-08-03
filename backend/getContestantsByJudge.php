<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);

    // Fetch the categories assigned to the judge
    $categoriesQuery = "
        SELECT c.categoryID
        FROM categories c
        JOIN judge_categories jc ON c.categoryID = jc.categoryID
        WHERE jc.judgeID = ?";
    
    $categoriesStmt = mysqli_prepare($con, $categoriesQuery);
    mysqli_stmt_bind_param($categoriesStmt, 'i', $judgeID);
    mysqli_stmt_execute($categoriesStmt);
    mysqli_stmt_bind_result($categoriesStmt, $categoryID);

    $categories = [];
    while (mysqli_stmt_fetch($categoriesStmt)) {
        $categories[] = $categoryID;
    }

    mysqli_stmt_close($categoriesStmt);

    // Fetch contestants for the categories
    if (count($categories) > 0) {
        $contestantsQuery = "
            SELECT c.idContestant, c.name, c.categoryID, c.contestantNo, c.gender
            FROM contestants c
            WHERE c.categoryID IN (" . implode(',', array_map('intval', $categories)) . ")
            ORDER BY FIELD(c.gender, 'Female', 'Male'), c.contestantNo";  // Order by gender and contestantNo
        
        $contestantsStmt = mysqli_prepare($con, $contestantsQuery);
        mysqli_stmt_execute($contestantsStmt);
        mysqli_stmt_bind_result($contestantsStmt, $contestantID, $name, $categoryID, $contestantNo, $gender);

        $contestants = [];
        while (mysqli_stmt_fetch($contestantsStmt)) {
            $contestants[] = [
                'idContestant' => $contestantID,
                'name' => $name,
                'categoryID' => $categoryID,
                'contestantNo' => $contestantNo,
                'gender' => $gender
            ];
        }

        mysqli_stmt_close($contestantsStmt);
    } else {
        $contestants = [];
    }

    // Return contestants
    echo json_encode([
        'contestants' => $contestants
    ]);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}

mysqli_close($con);
?>
