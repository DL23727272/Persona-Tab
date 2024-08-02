<?php
session_start();
include "../backend/myConnection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = isset($_POST['contestantID']) ? $_POST['contestantID'] : null;
    $name = isset($_POST['contestantName']) ? $_POST['contestantName'] : null;
    $age = isset($_POST['contestantAge']) ? $_POST['contestantAge'] : null;
    $address = isset($_POST['contestantAddress']) ? $_POST['contestantAddress'] : null;
    $gender = isset($_POST['contestantGender']) ? $_POST['contestantGender'] : null;

    // Check if all fields are provided
    if (empty($name) || empty($age) || empty($address) || empty($gender) || empty($id)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are mandatory']);
        exit();
    }

    // Check if there's a change in image upload
    $image_path = null;
    if ($_FILES['contestantImage']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['contestantImage']['tmp_name'])) {
        $image_name = $_FILES['contestantImage']['name'];
        $image_tmp = $_FILES['contestantImage']['tmp_name'];
        $image_path = '../contestant_image/' . $image_name;

        if (!move_uploaded_file($image_tmp, $image_path)) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
            exit();
        }
    }

    // Check if there are any actual changes
    $sql = "SELECT name, age, address, gender, image FROM contestants WHERE idContestant = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $existing = $result->fetch_assoc();

    if ($name == $existing['name'] && $age == $existing['age'] && $address == $existing['address'] && $gender == $existing['gender'] && ($image_path === null || $image_path == $existing['image'])) {
        echo json_encode(['status' => 'info', 'message' => 'No changes detected']);
        exit();
    }

    // Update query with or without image
    if ($image_path) {
        $sql = "UPDATE contestants SET name=?, age=?, address=?, gender=?, image=? WHERE idContestant=?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssssi", $name, $age, $address, $gender, $image_path, $id);
    } else {
        $sql = "UPDATE contestants SET name=?, age=?, address=?, gender=? WHERE idContestant=?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ssssi", $name, $age, $address, $gender, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Contestant updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update contestant in database']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
