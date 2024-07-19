<?php
include "../backend/myConnection.php";

if (isset($_POST['userSignUpName']) && isset($_POST['userSignUpPassword'])) {
    $username = $_POST["userSignUpName"];
    $password = $_POST["userSignUpPassword"];

    if ($username == "" || $password == "") {
        $response = [
            'status' => 'error',
            'message' => 'Empty fields! Please fill all the fields.'
        ];
    } else {
        // Hash the password 
        $passwordEncrypt = md5($password);

        // Insert user data into the database
        $query = "INSERT INTO users (username, password)
                  VALUES ('$username', '$passwordEncrypt')";

        if (mysqli_query($con, $query)) {
            $response = [
                'status' => 'success',
                'message' => 'Sign up successful! Welcome.'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to add record: ' . mysqli_error($con)
            ];
        }
    }
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
