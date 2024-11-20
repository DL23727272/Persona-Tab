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
    $bodyColor = isset($_POST['bodyColor']) ? $_POST['bodyColor'] : null;
    $heroBackgroundImage = isset($_FILES['heroBackgroundImage']) ? $_FILES['heroBackgroundImage'] : null;

    // Validate input
    if (empty($eventName) || empty($eventDescription) || empty($eventDate) || empty($eventImage)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Handle file upload for event image
    $targetDir = "../EventUploads/";
    $imageFileType = strtolower(pathinfo($eventImage["name"], PATHINFO_EXTENSION));
    $randomNumber = rand(1000, 9999); // Generate a random number
    $targetFile = $targetDir . basename($eventImage["name"], "." . $imageFileType) . "_" . $randomNumber . "." . $imageFileType;

    // Check if event image is a valid image
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

    // Allow certain file formats for event image
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed for event image.']);
        exit;
    }

    if (!move_uploaded_file($eventImage["tmp_name"], $targetFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error uploading your event image.']);
        exit;
    }

    // Handle file upload for hero background image
    $heroBackgroundImagePath = null;
    if ($heroBackgroundImage) {
        $heroImageFileType = strtolower(pathinfo($heroBackgroundImage["name"], PATHINFO_EXTENSION));
        $heroImageTargetFile = $targetDir . basename($heroBackgroundImage["name"], "." . $heroImageFileType) . "_" . $randomNumber . "." . $heroImageFileType;

        // Check if hero background image is a valid image
        $heroCheck = getimagesize($heroBackgroundImage["tmp_name"]);
        if ($heroCheck === false) {
            echo json_encode(['status' => 'error', 'message' => 'Hero background image is not valid.']);
            exit;
        }

        // Allow certain file formats for hero background image
        if ($heroImageFileType != "jpg" && $heroImageFileType != "png" && $heroImageFileType != "jpeg" && $heroImageFileType != "gif") {
            echo json_encode(['status' => 'error', 'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed for hero background image.']);
            exit;
        }

        if (!move_uploaded_file($heroBackgroundImage["tmp_name"], $heroImageTargetFile)) {
            echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error uploading your hero background image.']);
            exit;
        }

        // Store the hero background image path
        $heroBackgroundImagePath = $heroImageTargetFile;
    }

    // Prepare SQL statement to insert the event details including the new fields
    $sql = "INSERT INTO events (eventName, eventDescription, eventDate, eventImage, bodyColor, heroBackgroundImage) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
  //  $stmt->bind_param('ssssss', $eventName, $eventDescription, $eventDate, $targetFile, $bodyColor, $heroBackgroundImagePath);
    $stmt->bind_param('sssss', $eventName, $eventDescription, $eventDate, $targetFile, $bodyColor);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Event added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add event. Error: ' . $stmt->error]);
    }

    $stmt->close();
    $con->close();

//     ALTER TABLE events
//     -> ADD COLUMN bodyColor VARCHAR(7) DEFAULT NULL,
//     -> ADD COLUMN heroBackgroundImage VARCHAR(255) DEFAULT NULL;
// Query OK, 0 rows affected (0.030 sec)
?>
