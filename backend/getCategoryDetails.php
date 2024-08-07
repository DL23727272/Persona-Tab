<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

if (isset($_GET['eventID'])) {
    $eventID = $_GET['eventID'];
    $query = "SELECT categoryID, categoryName FROM categories WHERE eventID = $eventID";
    $result = $con->query($query);

    if ($result) {
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode($categories);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Categories not found']);
    }
}
?>
