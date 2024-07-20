<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; // Adjust the path to your database connection file

$sql = "SELECT judgeID, judgeName FROM judges";
$result = $con->query($sql);

$judges = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $judges[] = $row;
    }
    echo json_encode($judges);
} else {
    echo json_encode([]);
}

$con->close();
?>
