<?php
session_start();
include "../backend/myConnection.php";

function fetchContestants($con, $eventID = null, $categoryID = null, $gender = null) {
    // Initialize base query
    $sql = "SELECT c.*, cat.eventID 
            FROM contestants c 
            LEFT JOIN categories cat ON c.categoryID = cat.categoryID 
            WHERE 1=1";
    
    // Only add the category filter if a category is provided
    if ($categoryID) {
        $sql .= " AND c.categoryID = " . intval($categoryID);

        // Optionally add event filter if an eventID is provided
        if ($eventID) {
            $sql .= " AND cat.eventID = " . intval($eventID);
        }

        // Add gender filter if specified
        if ($gender && in_array($gender, ['Male', 'Female'])) {
            $sql .= " AND c.gender = '" . mysqli_real_escape_string($con, $gender) . "'";
        }

        // Order by gender if a gender is specified
        if ($gender) {
            $sql .= " ORDER BY FIELD(c.gender, 'Female', 'Male')";
        } else {
            // Default ordering if no gender filter is applied
            $sql .= " ORDER BY c.name"; // Example of default ordering
        }

        // Debugging: Output the final SQL query
       // echo "SQL Query: " . $sql . "<br>";

        $result = mysqli_query($con, $sql);

        // Check for SQL errors
        if (!$result) {
            die("Error executing query: " . mysqli_error($con));
        }

        if (mysqli_num_rows($result) > 0) {
            $contestantHtml = '';
            $contestantCount = 0;

            $contestantHtml .= '<div class="container mt-5">';
            $contestantHtml .= '<div class="row row-cols-1 row-cols-md-3 g-4">'; 

            while ($row = mysqli_fetch_assoc($result)) {
                $contestantID = $row['idContestant'];

                $contestantHtml .= '
                    <div class="col mt-5">
                        <div class="card h-100"  >
                            <div class="container mt-5 text-center">
                                <img src="contestants/'. $row['image'] .'" class="card-img-top mt-2" alt="Contestant Image" 
                                style="
                                width: 200px; 
                                height: 250px; 
                                border-radius:10px;
                                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                                ">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title  text-center">'. $row['name'] .'</h5>
                                <p class="card-text  text-center">Age: '. $row['age'] .'</p>
                                <p class="card-text  text-center"> '. $row['address'] .'</p>
                                <p class="card-text  text-center">Gender: '. $row['gender'] .'</p>
                                <p class="card-text  text-center">Contestant No: '. $row['contestantNo'] .'</p>
                                <div class="d-flex justify-content-between mt-3">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal'. $contestantID .'">Edit</button>
                                    <button type="button" class="btn btn-danger" onclick="confirmDelete('. $contestantID .')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Modal -->
                    <div class="modal fade" id="editModal'. $contestantID .'" tabindex="-1" aria-labelledby="editModalLabel'. $contestantID .'" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content"  style="background: rgba(255, 255, 255, 0.449); backdrop-filter: blur(10px);">
                                <div class="modal-header">
                                    <img src="img/logo.png" alt="" style="width: 50px;">
                                    <h5 class="modal-title" id="editModalLabel'. $contestantID .'">Edit Contestant</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="editForm'. $contestantID .'" method="POST" enctype="multipart/form-data">
                                        <input type="hidden" name="contestantID" value="'. $contestantID .'">
                                        
                                        <div class="form-group row my-4">
                                            <label for="contestantName'. $contestantID .'" class="col-sm-3 col-form-label">Name:</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="contestantName'. $contestantID .'" 
                                                name="contestantName" value="'. $row['name'] .'" required>
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label for="contestantAge'. $contestantID .'" class="col-sm-3 col-form-label">Age:</label>
                                            <div class="col-sm-9">
                                                <input type="number" class="form-control" id="contestantAge'. $contestantID .'" 
                                                name="contestantAge" value="'. $row['age'] .'" required>
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label for="contestantAddress'. $contestantID .'" class="col-sm-3 col-form-label">Address:</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="contestantAddress'. $contestantID .'" 
                                                name="contestantAddress" value="'. $row['address'] .'" required>
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label for="contestantGender'. $contestantID .'" class="col-sm-3 col-form-label">Gender:</label>
                                            <div class="col-sm-9">
                                                <select class="form-select" id="contestantGender'. $contestantID .'" name="contestantGender" required>
                                                    <option value="#" disabled selected>--- Select Gender</option>
                                                    <option value="Female" '. ($row['gender'] == 'Female' ? : '') .'>Female</option>
                                                    <option value="Male" '. ($row['gender'] == 'Male' ?  : '') .'>Male</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label for="contestantImage'. $contestantID .'" class="col-sm-3 col-form-label">Image:</label>
                                            <div class="col-sm-9">
                                                <input type="file" class="form-control" id="contestantImage'. $contestantID .'" name="contestantImage">
                                            </div>
                                        </div>
                                        <div class="form-group row mb-3">
                                            <label for="contestantNumber'. $contestantID .'" class="col-sm-3 col-form-label">Contestant No:</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="contestantNumber'. $contestantID .'" name="contestantNumber" value="'. htmlspecialchars($row['contestantNo']) .'" >
                                            </div>
                                        </div>
                                        
                                        <div class="form-group row">
                                            <div class="col-sm-9 offset-sm-9">
                                                <button type="button" class="btn btn-outline-light mt-3 " onclick="updateContestant('. $contestantID .')">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Edit Modal -->
                ';

                $contestantCount++;

                if ($contestantCount % 3 == 0) {
                    // Close the row and start a new one
                    $contestantHtml .= '</div><div class="row row-cols-1 row-cols-md-3 g-4">';
                }
            }

            $contestantHtml .= '</div>';

            $contestantHtml .= '</div>';

            echo $contestantHtml;
        } else {
            echo "<h3 class='fst-italic text-center text-white'>No contestants found.</h3>";
        }
    } else {
        echo "<h3 class='fst-italic text-center text-white'>Please select a category.</h3>";
    }
}

// Get parameters from the request
$eventID = isset($_POST['eventID']) ? $_POST['eventID'] : null;
$categoryID = isset($_POST['categoryID']) ? $_POST['categoryID'] : null;
$gender = isset($_POST['gender']) ? $_POST['gender'] : null;

fetchContestants($con, $eventID, $categoryID, $gender);
?>
