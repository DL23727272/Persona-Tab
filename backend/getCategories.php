<?php
header('Content-Type: application/json');
include "../backend/myConnection.php"; // Adjust the path to your database connection file

function getCategories($conn) {
    // Prepare SQL statement
    $sql = "SELECT categoryID, categoryName FROM categories";
    $result = $conn->query($sql);

    $categories = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row; // Collect the rows into an array
        }
        return json_encode($categories); // Return the array as JSON
    } else {
        return json_encode(['status' => 'error', 'message' => 'No categories found.']);
    }
}

// Call the function and output the result
echo getCategories($con);

$con->close();
?>
