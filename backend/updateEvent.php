<?php
header('Content-Type: application/json');
include "../backend/myConnection.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$logFile = 'log.txt';

// Log received POST data
file_put_contents($logFile, print_r($_POST, true), FILE_APPEND);
file_put_contents($logFile, json_encode($_POST) . "\n", FILE_APPEND);
file_put_contents($logFile, json_encode($_FILES) . "\n", FILE_APPEND);

// Retrieve POST data
$eventID = isset($_POST['editEventID']) ? $_POST['editEventID'] : null;
$eventName = isset($_POST['editEventName']) ? $_POST['editEventName'] : null;
$eventDescription = isset($_POST['editEventDescription']) ? $_POST['editEventDescription'] : null;
$eventDate = isset($_POST['editEventDate']) ? $_POST['editEventDate'] : null;
$currentEventImage = isset($_POST['currentEventImage']) ? $_POST['currentEventImage'] : null;
$eventImage = isset($_FILES['editEventImage']) ? $_FILES['editEventImage'] : null;
$heroBackgroundImage = isset($_FILES['editHeroBackgroundImage']) ? $_FILES['editHeroBackgroundImage'] : null;
$bodyColor = isset($_POST['editBodyColor']) ? $_POST['editBodyColor'] : null;

// Log retrieved data
file_put_contents($logFile, "Event ID: $eventID\n", FILE_APPEND);
file_put_contents($logFile, "Event Name: $eventName\n", FILE_APPEND);
file_put_contents($logFile, "Event Description: $eventDescription\n", FILE_APPEND);
file_put_contents($logFile, "Event Date: $eventDate\n", FILE_APPEND);
file_put_contents($logFile, "Current Event Image: $currentEventImage\n", FILE_APPEND);
file_put_contents($logFile, "Uploaded Event Image: " . print_r($eventImage, true) . "\n", FILE_APPEND);
file_put_contents($logFile, "Uploaded Hero Background Image: " . print_r($heroBackgroundImage, true) . "\n", FILE_APPEND);

// Validate input
if (empty($eventID) || empty($eventName) || empty($eventDescription) || empty($eventDate)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Handle event image upload if a new file is provided
if ($eventImage && $eventImage['error'] == UPLOAD_ERR_OK && !empty($eventImage['name'])) {
    $targetDir = "../EventUploads/";
    $imageFileType = strtolower(pathinfo($eventImage["name"], PATHINFO_EXTENSION));
    $randomNumber = rand(1000, 9999); // Generate a random number
    $targetFile = $targetDir . basename($eventImage["name"], "." . $imageFileType) . "_" . $randomNumber . "." . $imageFileType;

    // Check if image file is an actual image or fake image
    $check = getimagesize($eventImage["tmp_name"]);
    if ($check === false) {
        echo json_encode(['status' => 'error', 'message' => 'File is not an image.']);
        exit;
    }

    // Check file size (5MB max)
    if ($eventImage["size"] > 5000000) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, your file is too large.']);
        exit;
    }

    // Allow certain file formats
    if (!in_array($imageFileType, ["jpg", "png", "jpeg", "gif"])) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.']);
        exit;
    }

    if (!move_uploaded_file($eventImage["tmp_name"], $targetFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error uploading your file.']);
        exit;
    }
} else {
    // Use current event image if no new image is uploaded
    $targetFile = $currentEventImage;
}

// Handle hero background image upload if a new file is provided
if ($heroBackgroundImage && $heroBackgroundImage['error'] == UPLOAD_ERR_OK && !empty($heroBackgroundImage['name'])) {
    $heroDir = "../EventUploads/";
    $heroFileType = strtolower(pathinfo($heroBackgroundImage["name"], PATHINFO_EXTENSION));
    $heroRandomNumber = rand(1000, 9999); // Generate a random number for hero background
    $heroTargetFile = $heroDir . basename($heroBackgroundImage["name"], "." . $heroFileType) . "_" . $heroRandomNumber . "." . $heroFileType;

    // Check if image file is an actual image or fake image
    $checkHero = getimagesize($heroBackgroundImage["tmp_name"]);
    if ($checkHero === false) {
        echo json_encode(['status' => 'error', 'message' => 'Hero background file is not an image.']);
        exit;
    }

    // Check file size (5MB max)
    if ($heroBackgroundImage["size"] > 5000000) {
        echo json_encode(['status' => 'error', 'message' => 'Hero background file is too large.']);
        exit;
    }

    // Allow certain file formats for the hero background
    if (!in_array($heroFileType, ["jpg", "png", "jpeg", "gif"])) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed for the hero background.']);
        exit;
    }

    if (!move_uploaded_file($heroBackgroundImage["tmp_name"], $heroTargetFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error uploading your hero background file.']);
        exit;
    }
} else {
    // Use current hero background if no new image is uploaded
    $heroTargetFile = isset($currentHeroBackgroundImage) ? $currentHeroBackgroundImage : null;
}

// Prepare SQL statement to update event
$sql = "UPDATE events SET eventName = ?, eventDescription = ?, eventDate = ?, eventImage = ?, heroBackgroundImage = ?, bodyColor = ? WHERE eventID = ?";
$stmt = $con->prepare($sql);
if (!$stmt) {
    file_put_contents($logFile, "Prepare failed: " . $con->error . "\n", FILE_APPEND);
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement.']);
    exit;
}

// Bind parameters for event update
$stmt->bind_param('ssssssi', $eventName, $eventDescription, $eventDate, $targetFile, $heroTargetFile, $bodyColor, $eventID);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Event updated successfully.']);
} else {
    file_put_contents($logFile, "Execute failed: " . $stmt->error . "\n", FILE_APPEND);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update event. Error: ' . $stmt->error]);
}

$stmt->close();
$con->close();
?>
