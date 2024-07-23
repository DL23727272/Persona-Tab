<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

// Function to check if criterionID exists
function criterionExists($criterionID, $con) {
    $query = "SELECT 1 FROM criteria WHERE criteriaID = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, 'i', $criterionID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    $exists = mysqli_stmt_num_rows($stmt) > 0;
    mysqli_stmt_close($stmt);
    return $exists;
}

// Retrieve and decode JSON data
$data = json_decode($_POST['scores'], true);
$response = ['success' => false, 'message' => ''];

foreach ($data as $scoreData) {
    foreach ($scoreData['scores'] as $criterionID => $score) {
        if (!criterionExists($criterionID, $con)) {
            $response['message'] = "Invalid criterionID: $criterionID.";
            echo json_encode($response);
            mysqli_close($con);
            exit;
        }
    }
}

// Update scores in database
foreach ($data as $scoreData) {
    $contestantID = $scoreData['contestantID'];
    foreach ($scoreData['scores'] as $criterionID => $score) {
        $updateQuery = "UPDATE scores SET score = ? WHERE contestantID = ? AND criterionID = ?";
        $updateStmt = mysqli_prepare($con, $updateQuery);
        mysqli_stmt_bind_param($updateStmt, 'dii', $score, $contestantID, $criterionID);
        
        if (!mysqli_stmt_execute($updateStmt)) {
            $response['message'] = "Error: " . mysqli_error($con);
            echo json_encode($response);
            mysqli_close($con);
            exit;
        }
    }
}

$response['success'] = true;
$response['message'] = "Scores updated successfully.";
echo json_encode($response);

mysqli_close($con);
?>