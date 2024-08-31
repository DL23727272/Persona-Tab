<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

// Debugging: Log incoming POST data
error_log("Received POST data: " . print_r($_POST, true));

// Check if categoryID is provided and is a valid integer
if (isset($_POST['categoryID']) && is_numeric($_POST['categoryID'])) {
    $categoryID = intval($_POST['categoryID']); // Safely convert to integer
    error_log("Received categoryID: " . $categoryID);

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        // Delete all scores related to the criteria in the category
        $deleteScoresQuery = "DELETE FROM scores WHERE criterionID IN (SELECT criteriaID FROM criteria WHERE categoryID = ?)";
        $stmt = mysqli_prepare($con, $deleteScoresQuery);
        mysqli_stmt_bind_param($stmt, 'i', $categoryID);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) < 0) {
            throw new Exception('Failed to delete scores.');
        }
        mysqli_stmt_close($stmt);

        // Delete all criteria related to the category
        $deleteCriteriaQuery = "DELETE FROM criteria WHERE categoryID = ?";
        $stmt = mysqli_prepare($con, $deleteCriteriaQuery);
        mysqli_stmt_bind_param($stmt, 'i', $categoryID);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) < 0) {
            throw new Exception('Failed to delete criteria.');
        }
        mysqli_stmt_close($stmt);

        // Delete all contestants related to the category
        $deleteContestantsQuery = "DELETE FROM contestants WHERE categoryID = ?";
        $stmt = mysqli_prepare($con, $deleteContestantsQuery);
        mysqli_stmt_bind_param($stmt, 'i', $categoryID);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) < 0) {
            throw new Exception('Failed to delete contestants.');
        }
        mysqli_stmt_close($stmt);

        // Delete all judge categories related to the category
        $deleteJudgeCategoriesQuery = "DELETE FROM judge_categories WHERE categoryID = ?";
        $stmt = mysqli_prepare($con, $deleteJudgeCategoriesQuery);
        mysqli_stmt_bind_param($stmt, 'i', $categoryID);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) < 0) {
            throw new Exception('Failed to delete judge categories.');
        }
        mysqli_stmt_close($stmt);

        // Delete the category itself
        $deleteCategoryQuery = "DELETE FROM categories WHERE categoryID = ?";
        $stmt = mysqli_prepare($con, $deleteCategoryQuery);
        mysqli_stmt_bind_param($stmt, 'i', $categoryID);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) < 0) {
            throw new Exception('Failed to delete category.');
        }
        mysqli_stmt_close($stmt);

        // Commit the transaction
        mysqli_commit($con);
        
        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        // Rollback the transaction if any query fails
        mysqli_rollback($con);
        error_log("Transaction failed: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete category. Please try again.']);
    }
} else {
    error_log("Category ID not provided or invalid in POST data.");
    echo json_encode(['status' => 'error', 'message' => 'Category ID not provided or invalid.']);
}

mysqli_close($con);
?>
