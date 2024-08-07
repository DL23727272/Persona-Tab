<?php
    header('Content-Type: application/json');
    include "../backend/myConnection.php";

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    file_put_contents('log.txt', json_encode($_POST) . "\n", FILE_APPEND);
    file_put_contents('log.txt', json_encode($_FILES) . "\n", FILE_APPEND);

    // Retrieve POST data
    $eventName = isset($_POST['eventName']) ? $_POST['eventName'] : null;
    $eventDescription = isset($_POST['eventDescription']) ? $_POST['eventDescription'] : null;
    $eventDate = isset($_POST['eventDate']) ? $_POST['eventDate'] : null;
    $eventImage = isset($_FILES['eventImage']) ? $_FILES['eventImage'] : null;

    // Validate input
    if (empty($eventName) || empty($eventDescription) || empty($eventDate) || empty($eventImage)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Handle file upload
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
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.']);
        exit;
    }

    if (!move_uploaded_file($eventImage["tmp_name"], $targetFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error uploading your file.']);
        exit;
    }

    // Prepare SQL statement
    $sql = "INSERT INTO events (eventName, eventDescription, eventDate, eventImage) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param('ssss', $eventName, $eventDescription, $eventDate, $targetFile);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Event added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add event. Error: ' . $stmt->error]);
    }

    $stmt->close();
    $con->close();

    // ALTER TABLE events ADD COLUMN eventDate DATE DEFAULT NULL;
?>
