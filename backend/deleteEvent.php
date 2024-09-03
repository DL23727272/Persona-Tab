<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; 

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $eventID = $_POST['eventID'];

    if (empty($eventID)) {
        echo json_encode(['status' => 'error', 'message' => 'Event ID is required.']);
        exit();
    }

    // Start a transaction
    mysqli_begin_transaction($con);

    try {
        //  Delete scores related to contestants of the categories in the event
        $query = "DELETE s FROM scores s
                  JOIN contestants co ON s.contestantID = co.idContestant
                  JOIN categories cat ON co.categoryID = cat.categoryID
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        // Delete contestants related to the categories in the event
        $query = "DELETE co FROM contestants co
                  JOIN categories cat ON co.categoryID = cat.categoryID
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        //  Delete scores associated with the criteria that belong to the categories of the event
        $query = "DELETE s FROM scores s
                  JOIN criteria c ON s.criterionID = c.criteriaID
                  JOIN categories cat ON c.categoryID = cat.categoryID
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        //  Delete judges assigned to those categories
        $query = "DELETE jc FROM judge_categories jc
                  JOIN categories cat ON jc.categoryID = cat.categoryID
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        //  Delete criteria related to categories in the event
        $query = "DELETE c FROM criteria c 
                  JOIN categories cat ON c.categoryID = cat.categoryID 
                  WHERE cat.eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        //  Delete categories related to the event
        $query = "DELETE FROM categories WHERE eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        //  Finally, delete the event itself
        $query = "DELETE FROM events WHERE eventID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventID);
        $stmt->execute();
        $stmt->close();

        // Commit transaction
        mysqli_commit($con);
        echo json_encode(['status' => 'success']);
    } catch (mysqli_sql_exception $e) {
        mysqli_rollback($con);
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete event.', 'error' => $e->getMessage()]);
    }

    $con->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

?>
