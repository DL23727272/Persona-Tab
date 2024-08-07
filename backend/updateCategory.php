<?php
include "../backend/myConnection.php"; 
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $categoryID = $_POST['categoryID'];
    $categoryName = $_POST['editCategoryName'];

    $sql = "UPDATE categories SET categoryName = ? WHERE categoryID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("si", $categoryName, $categoryID);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update category.']);
    }
}
?>
