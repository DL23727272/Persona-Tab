<?php
include "../backend/myConnection.php";

header('Content-Type: application/json');

// Check if the database connection is successful
if (!$con) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

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

// Validate POST data
if (!isset($_POST['scores']) || !isset($_POST['judgeID'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required data.']);
    mysqli_close($con);
    exit;
}

// Retrieve and decode JSON data
$data = json_decode($_POST['scores'], true);
$response = ['success' => false, 'message' => ''];
$judgeID = $_POST['judgeID'];

// Validate the received JSON data
if (json_last_error() !== JSON_ERROR_NONE) {
    $response['message'] = "Invalid JSON data.";
    echo json_encode($response);
    mysqli_close($con);
    exit;
}

// Check if scores are in the correct format
if (!is_array($data)) {
    $response['message'] = "Invalid data format.";
    echo json_encode($response);
    mysqli_close($con);
    exit;
}

// Check if each criterionID exists and validate scores
foreach ($data as $scoreData) {
    if (!isset($scoreData['contestantID']) || !isset($scoreData['scores'])) {
        $response['message'] = "Invalid score data structure.";
        echo json_encode($response);
        mysqli_close($con);
        exit;
    }

    foreach ($scoreData['scores'] as $criterionID => $score) {
        if (!criterionExists($criterionID, $con)) {
            $response['message'] = "Invalid criterionID: $criterionID.";
            echo json_encode($response);
            mysqli_close($con);
            exit;
        }
    }
}

// Update scores in the database
foreach ($data as $scoreData) {
    $contestantID = $scoreData['contestantID'];
    foreach ($scoreData['scores'] as $criterionID => $score) {
        // Update score only for the specified judge
        $query = "UPDATE scores SET score = ? WHERE contestantID = ? AND criterionID = ? AND judgeID = ?";
        $stmt = mysqli_prepare($con, $query);

        // Bind decimal score value using 'd' for double/decimal
        mysqli_stmt_bind_param($stmt, 'diii', $score, $contestantID, $criterionID, $judgeID);

        if (mysqli_stmt_execute($stmt)) {
            // Optionally check if any rows were affected
            if (mysqli_stmt_affected_rows($stmt) === 0) {
                $response['message'] = "No scores updated for contestantID: $contestantID, criterionID: $criterionID.";
            }
        } else {
            $response['message'] = "Failed to update scores: " . mysqli_error($con);
            mysqli_stmt_close($stmt);
            echo json_encode($response);
            mysqli_close($con);
            exit;
        }
        mysqli_stmt_close($stmt);
    }
}


$response['success'] = true;
$response['message'] = "Scores updated successfully.";
echo json_encode($response);

mysqli_close($con);
//ALTER TABLE scores MODIFY score DECIMAL(5,2);
?>



