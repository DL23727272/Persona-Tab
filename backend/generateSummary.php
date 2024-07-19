<?php
include "../backend/myConnection.php";

$tables = ['denimattire',  'sportswear', 'swimsuitandtrunks','formalattire', 'qanda'];
$judges = [];

foreach ($tables as $table) {
    $sql = "SELECT JudgeId, gender, candidate, score
            FROM $table";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $judgeId = $row['JudgeId'];
            $gender = $row['gender'];
            $candidate = $row['candidate'];
            $score = floatval($row['score']); // Convert score to float if necessary

            if (!isset($judges[$judgeId])) {
                $judges[$judgeId] = ['male' => [], 'female' => []];
            }

            if (!isset($judges[$judgeId][$gender][$candidate])) {
                $judges[$judgeId][$gender][$candidate] = [
                    'total_score' => 0, // Initialize total score
                    'scores' => []     // Array to hold individual scores
                ];
            }

            // Sum up the scores for each candidate
            $judges[$judgeId][$gender][$candidate]['scores'][$table] = $score;
            $judges[$judgeId][$gender][$candidate]['total_score'] += $score;
        }
    }
}

function displayScores($candidates, $gender, $judgeId, $tables) {
    echo '<h4 class="fst-bold text-center text-white mt-5">' . ucfirst($gender) . ' Candidates</h4>';
    echo '<form method="POST" action="updateScores.php">';
    echo '<input type="hidden" name="judgeId" value="' . htmlspecialchars($judgeId) . '">';
    echo '<input type="hidden" name="gender" value="' . htmlspecialchars($gender) . '">';
    echo '<table class="table table-bordered">';
    echo '<thead>
            <tr>
                <th class="bg-primary">Candidate</th>
                <th class="bg-primary">Denim Attire</th>
                <th class="bg-primary">Sportswear</th>
                <th class="bg-primary">Swimsuit/Trunks</th>
                <th class="bg-primary">Formal Attire</th>
                <th class="bg-primary">Q&A</th>
                <th class="bg-primary">Overall Score</th>
            </tr>
          </thead>';
    echo '<tbody>';

    foreach ($candidates as $candidate => $data) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($candidate) . '</td>';
        foreach ($tables as $table) {
            echo '<td><input type="text" style="width: 60px" name="scores[' . htmlspecialchars($candidate) . '][' . $table . ']" value="' . htmlspecialchars($data['scores'][$table] ?? 0) . '"></td>';
        }
        echo '<td class="text-bg-warning fw-bold">' . htmlspecialchars($data['total_score']) . '</td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';
    echo '<button type="submit" class="btn btn-primary" >Save Changes</button>'; 
    echo '</form>';
}

foreach ($judges as $judgeId => $genders) {
    echo '<h2 class="fst-italic text-center text-white mt-5">Judge No: ' . htmlspecialchars($judgeId) . '</h2>';
    echo '<h2 class="fst-bold text-center text-white">Overall Score (100 Points)</h2>';

    displayScores($genders['male'], 'male', $judgeId, $tables);

    displayScores($genders['female'], 'female', $judgeId, $tables);
}

$con->close();
?>
