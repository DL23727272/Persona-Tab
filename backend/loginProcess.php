<?php
include "../backend/myConnection.php";

    if (isset($_POST['customerLoginName']) && isset($_POST['customerLoginPassword'])) {
        $username = $_POST["customerLoginName"];
        $password = $_POST["customerLoginPassword"];


        if ($username == "" || $password == "") {
            $response = [
                'status' => 'error',
                'message' => 'Empty fields! Please fill all the fields.'
            ];
        } else {

            $hashedPassword = md5($password);

            $query = "SELECT * FROM judges WHERE judgeName = '$username'";
            $result = mysqli_query($con, $query);

            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_assoc($result);
                // Verify hashed password
                if ($hashedPassword === $row['judgePassword']) {
                    $judgeID = $row['judgeID'];
                    $customerName = $row['judgeName'];
                    $userType = $row['userType'];
                    // Passwords match, login successful
                    $response = [
                        'status' => 'success',
                        'message' => 'Welcome!',

                        //retrieve the information para sa cart, admin, ordering
                        'judgeID' => $judgeID,
                        'judgeName' => $customerName,
                        'type' => $userType

                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Invalid username or password.'
                    ];
                }
            } else {
                // User doesn't exist
                $response = [
                    'status' => 'error',
                    'message' => 'Invalid username or password.'
                ];
            }
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'All fields are mandatory'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
