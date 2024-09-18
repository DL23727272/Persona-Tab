<?php
include "../backend/myConnection.php"; 

header('Content-Type: application/json');

// Sample hardcoded contestant data
$contestants = [
    ['contestantID' => 1, 'contestantName' => 'John Doe'],
    ['contestantID' => 2, 'contestantName' => 'Jane Smith']
];

// Initialize data array
$data = [];

foreach ($contestants as $contestant) {
    $contestantID = $contestant['contestantID'];
    $contestantName = $contestant['contestantName'];
    
    // Retrieve criteria and scores
    $sql = "SELECT c.criteriaName, s.score
            FROM scores s
            JOIN criteria c ON s.criterion = c.criteriaID
            WHERE s.contestantID = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param('i', $contestantID);
    $stmt->execute();
    $result = $stmt->get_result();

    $criteriaScores = [];
    while ($row = $result->fetch_assoc()) {
        $criteriaScores[$row['criteriaName']] = $row['score'];
    }

    // Add contestant data to the array
    $data[] = [
        'contestantName' => $contestantName,
        'scores' => $criteriaScores
    ];
}

echo json_encode($data);

$stmt->close();
$con->close();
?>
