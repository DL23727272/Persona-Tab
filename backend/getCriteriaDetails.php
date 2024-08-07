<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

if (isset($_GET['categoryID'])) {
    $categoryID = $_GET['categoryID'];
    $query = "SELECT criteriaID, criteriaName, criteriaScore FROM criteria WHERE categoryID = $categoryID";
    $result = $con->query($query);

    if ($result) {
        $criteria = [];
        while ($row = $result->fetch_assoc()) {
            $criteria[] = $row;
        }
        echo json_encode($criteria);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Criteria not found']);
    }
}
?>
