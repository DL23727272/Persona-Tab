<?php
include "../backend/myConnection.php"; 

if (isset($_GET['categoryID'])) {
    $categoryID = $_GET['categoryID'];

    $query = "SELECT j.judgeID, j.judgeName FROM judges j
              INNER JOIN judge_categories jc ON j.judgeID = jc.judgeID
              WHERE jc.categoryID = ?";
    
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("i", $categoryID);
        $stmt->execute();
        $result = $stmt->get_result();

        $judges = array();
        while ($row = $result->fetch_assoc()) {
            $judges[] = $row;
        }

        echo json_encode($judges);
        $stmt->close();
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Failed to prepare statement.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Category ID not provided.'));
}

$con->close();
?>
