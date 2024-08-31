<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $eventID = $_POST['eventID'];

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        // Delete criteria related to categories in the event
        $query = "DELETE c FROM criteria c 
                  JOIN categories cat ON c.categoryID = cat.categoryID 
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();

        // Delete categories related to the event
        $query = "DELETE FROM categories WHERE eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();

        // Delete the event itself
        $query = "DELETE FROM events WHERE eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();

        // Commit the transaction
        mysqli_commit($con);
        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        // Rollback the transaction if any query fails
        mysqli_rollback($con);
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete event.']);
    }

    $stmt->close();
    $con->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
