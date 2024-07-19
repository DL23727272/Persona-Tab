<?php
    require '../vendor/autoload.php'; 

    include "../backend/myConnection.php";

    use setasign\Fpdi\Fpdi;
    use setasign\Fpdi\PdfReader;
    use setasign\Fpdi\Fpdi as TfpdfFpdi;

    $tables = ['denimattire', 'formalattire', 'qanda', 'sportswear', 'swimsuitandtrunks'];
    $candidates = ['male' => [], 'female' => []];

    foreach ($tables as $table) {
        $sql = "SELECT gender, candidate, SUM(score) as total_score
                FROM $table
                GROUP BY gender, candidate";

        $result = $con->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $gender = $row['gender'];
                $candidate = $row['candidate'];
                $score = $row['total_score'];

                if (!isset($candidates[$gender][$candidate])) {
                    $candidates[$gender][$candidate] = 0;
                }

                $candidates[$gender][$candidate] += $score;
            }
        }
    }

    $con->close();

    class PDF extends TfpdfFpdi {
        function Header() {
            $this->SetFont('Arial', 'B', 12);
            $this->Cell(0, 10, 'Overall Summary', 0, 1, 'C');
            $this->Ln(5);
        }

        function TableHeader($header) {
            $this->SetFont('Arial', 'B', 10);
            foreach ($header as $col) {
                $this->Cell(60, 7, $col, 1);
            }
            $this->Ln();
        }

        function TableRow($row) {
            $this->SetFont('Arial', '', 10);
            foreach ($row as $col) {
                $this->Cell(60, 6, $col, 1);
            }
            $this->Ln();
        }

        function AddTitle($title) {
            $this->SetFont('Arial', 'B', 12);
            $this->Cell(0, 10, $title, 0, 1, 'C');
            $this->Ln(5);
        }
    }

    $pdf = new PDF();
    $pdf->AddPage();

    // Male candidates
    $pdf->AddTitle('Male Candidates');
    $pdf->TableHeader(['Candidate', 'Total Score', 'Rank']);
    $maleCandidates = $candidates['male'];
    arsort($maleCandidates); 
    $rank = 1;
    foreach ($maleCandidates as $candidate => $totalScore) {
        $pdf->TableRow([htmlspecialchars($candidate), number_format($totalScore, 2), $rank++]);
    }

    // Female candidates
    $pdf->AddTitle('Female Candidates');
    $pdf->TableHeader(['Candidate', 'Total Score', 'Rank']);
    $femaleCandidates = $candidates['female'];
    arsort($femaleCandidates); 
    $rank = 1;
    foreach ($femaleCandidates as $candidate => $totalScore) {
        $pdf->TableRow([htmlspecialchars($candidate), number_format($totalScore, 2), $rank++]);
    }

    $pdfPath = 'D:/xampp/htdocs/3rdyr/Tabulation/results/summary.pdf';
    $pdf->Output('F', $pdfPath);

    $response = [
        'success' => true,
        'message' => "PDF saved to: $pdfPath"
    ];

    echo json_encode($response);
?>
