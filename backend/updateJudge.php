<?php
    header('Content-Type: application/json');
    include "../backend/myConnection.php";

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $judgeID = $input['judgeID'];
    $judgeName = $input['judgeName'];
    $userType = $input['userType'];
    $judgePassword = $input['judgePassword'];

    // Update the judge name and user type grrrrr
    if (!empty($judgePassword)) {
        $hashedPassword = md5($judgePassword); 
        $sql = "UPDATE judges SET judgeName = ?, userType = ?, judgePassword = ? WHERE judgeID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssi", $judgeName, $userType, $hashedPassword, $judgeID);
    } else {
        $sql = "UPDATE judges SET judgeName = ?, userType = ? WHERE judgeID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ssi", $judgeName, $userType, $judgeID);
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "Judge updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update judge"]);
    }

    $stmt->close();
    $con->close();
?>
