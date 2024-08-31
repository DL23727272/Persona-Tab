<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

// Debugging: Log incoming POST data
error_log("Received POST data: " . print_r($_POST, true));

// Check if criteriaID is provided and is a valid integer
if (isset($_POST['criteriaID']) && is_numeric($_POST['criteriaID'])) {
    $criteriaID = intval($_POST['criteriaID']); // Safely convert to integer
    error_log("Received criteriaID: " . $criteriaID);

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        // Delete all scores related to the deleted criteria
        $deleteScoresQuery = "DELETE FROM scores WHERE criterionID = ?";
        $stmt = mysqli_prepare($con, $deleteScoresQuery);
        mysqli_stmt_bind_param($stmt, 'i', $criteriaID);
        
        if (!mysqli_stmt_execute($stmt)) {
            error_log("Failed to execute delete scores query: " . mysqli_stmt_error($stmt));
            throw new Exception('Failed to execute delete scores query.');
        }
        mysqli_stmt_close($stmt);

        // Delete the criteria
        $deleteCriteriaQuery = "DELETE FROM criteria WHERE criteriaID = ?";
        $stmt = mysqli_prepare($con, $deleteCriteriaQuery);
        mysqli_stmt_bind_param($stmt, 'i', $criteriaID);
        
        if (!mysqli_stmt_execute($stmt)) {
            error_log("Failed to execute delete criteria query: " . mysqli_stmt_error($stmt));
            throw new Exception('Failed to execute delete criteria query.');
        }
        mysqli_stmt_close($stmt);

        // Commit the transaction
        mysqli_commit($con);
        
        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        // Rollback the transaction if any query fails
        mysqli_rollback($con);
        error_log("Transaction failed: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete criteria. Please try again.']);
    }
} else {
    error_log("Criteria ID not provided or invalid in POST data.");
    echo json_encode(['status' => 'error', 'message' => 'Criteria ID not provided or invalid.']);
}

mysqli_close($con);
?>
