<?php
include "../backend/myConnection.php";

if (isset($_POST['name']) && isset($_POST['age']) && isset($_POST['address']) && isset($_POST['gender']) && isset($_FILES['image']) && isset($_POST['categoryID'])) {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $categoryID = $_POST['categoryID'];
    $contestantNumber = $_POST['contestantNumber'];

    // Validate categoryID
    $categoryQuery = "SELECT categoryID FROM categories WHERE categoryID = ?";
    $stmt = $con->prepare($categoryQuery);
    $stmt->bind_param('i', $categoryID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $response = [
            'status' => 'error',
            'message' => 'Invalid category ID.'
        ];
        echo json_encode($response);
        exit();
    }

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

    $query = "INSERT INTO contestants (name, age, address, gender, image, categoryID, contestantNo)
              VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $con->prepare($query);
    $stmt->bind_param('sisssis', $name, $age, $address, $gender, $image, $categoryID, $contestantNumber);

    if ($stmt->execute()) {
        $response = [
            'status' => 'success',
            'message' => 'Contestant added successfully!'
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Failed to add contestant: ' . $stmt->error
        ];
    }
    $stmt->close();
    mysqli_close($con);
} else {
    $response = [
        'status' => 'error',
        'message' => 'All fields are mandatory'
    ];
}

header('Content-Type: application/json');
echo json_encode($response);

?>
