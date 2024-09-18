<?php
    include "../backend/myConnection.php";

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $response = [];

    if (isset($_POST['name']) && isset($_POST['age']) && isset($_POST['address']) && isset($_POST['gender']) && isset($_FILES['image']) && isset($_POST['categories'])) {
        $name = $_POST['name'];
        $age = $_POST['age'];
        $address = $_POST['address'];
        $gender = $_POST['gender'];
        $categories = $_POST['categories']; 
        $contestantNumber = $_POST['contestantNumber'];

        // Handle image upload
        $targetDir = "../contestant_image/";
        $targetFile = $targetDir . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            $image = $targetFile;
        } else {
            $response = [
                'status' => 'error',
                'message' => 'There was an error uploading the image.'
            ];
            echo json_encode($response);
            exit();
        }

        // Insert contestant for each category
        $success = true;
        foreach ($categories as $categoryID) {
            $query = "INSERT INTO contestants (name, age, address, gender, image, categoryID, contestantNo) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $con->prepare($query);
            $stmt->bind_param('sisssis', $name, $age, $address, $gender, $image, $categoryID, $contestantNumber);

            if (!$stmt->execute()) {
                $success = false;
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to add contestant to category ' . $categoryID . ': ' . $stmt->error
                ];
                break;
            }
        }

        if ($success) {
            $response = [
                'status' => 'success',
                'message' => 'Contestant added successfully to selected categories!'
            ];
        }

        $stmt->close();
        $con->close();
    } else {
        $response = [
            'status' => 'error',
            'message' => 'All fields are mandatory'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
