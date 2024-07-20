<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

if (isset($_GET['judgeID'])) {
    $judgeID = intval($_GET['judgeID']);

    // Fetch the category(s) for the given judge
    $query = "SELECT c.categoryID, c.categoryName
              FROM judges j
              JOIN categories c ON j.judgeID = c.categoryID
              WHERE j.judgeID = ?";

    if ($stmt = mysqli_prepare($con, $query)) {
        mysqli_stmt_bind_param($stmt, 'i', $judgeID);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $categoryID, $categoryName);

        $categories = [];
        while (mysqli_stmt_fetch($stmt)) {
            $categories[] = ['categoryID' => $categoryID, 'categoryName' => $categoryName];
        }

        mysqli_stmt_close($stmt);

        // Fetch criteria based on categoryID(s)
        $categoryIDs = array_column($categories, 'categoryID');
        if (count($categoryIDs) > 0) {
            $criteriaQuery = "SELECT criteriaID, criteriaName FROM criteria WHERE categoryID IN (" . implode(',', $categoryIDs) . ")";

            if ($criteriaResult = mysqli_query($con, $criteriaQuery)) {
                $criteria = [];
                while ($row = mysqli_fetch_assoc($criteriaResult)) {
                    $criteria[] = $row;
                }

                echo json_encode(['criteria' => $criteria]);
            } else {
                error_log('Failed to fetch criteria: ' . mysqli_error($con));
                echo json_encode(['error' => 'Failed to fetch criteria.']);
            }
        } else {
            echo json_encode(['error' => 'No categories found for the selected judge.']);
        }
    } else {
        error_log('Failed to prepare query: ' . mysqli_error($con));
        echo json_encode(['error' => 'Failed to prepare query.']);
    }

    mysqli_close($con);
} else {
    echo json_encode(['error' => 'judgeID parameter missing.']);
}
?>
