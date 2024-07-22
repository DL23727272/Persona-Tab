


    // --------------- FETCH SCORES FOR OVERALL.HTML SCORE TABLE --------------
    $(document).ready(function() {
        function loadEvents() {
            $.ajax({
                url: './backend/getEvents.php',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var options = '<option value="#" disabled selected>--- Select Event ---</option>';
                    $.each(data, function(index, event) {
                        options += '<option value="' + event.eventID + '">' + event.eventName + '</option>';
                    });
                    $('#eventSelect').html(options);
                    
                },
                error: function() {
                    alertify.error('Error loading events.');
                }
            });
        }
    
        // Function to fetch and filter categories based on the selected event
        function loadCategories(eventID) {
            $.ajax({
                url: './backend/adminGetCategories.php',
                method: 'GET',
                data: { eventID: eventID },
                dataType: 'json',
                success: function(data) {
                    var filteredCategories = [];
    
                
                    filteredCategories = data; 
                
                    // Debugging: Log the filtered categories to console
                    console.log("Filtered Categories:", filteredCategories);
    
                    var options = '<option value="#" disabled selected>--- Select Category ---</option>';
                    $.each(filteredCategories, function(index, category) {
                        options += '<option value="' + category.categoryID + '">' + category.categoryName + '</option>';
                    });
                    $('#categorySelect').html(options);
                },
                error: function() {
                    alertify.error('Error loading categories.');
                }
            });
        }
    
        // Call loadEvents on page load
        loadEvents();
    
        // Event listener for event selection change
        $('#eventSelect').change(function() {
            var eventID = $(this).val();
            if (eventID) {
                loadCategories(eventID);
            }
        });
    
        // Function to fetch scores
        function fetchScores() {
            var eventID = $('#eventSelect').val();
            var categoryID = $('#categorySelect').val();
    
            if (eventID && categoryID) {
                $.ajax({
                    url: './backend/getOverallScores.php',
                    type: 'POST',
                    data: { eventID: eventID, categoryID: categoryID },
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            displayScores(response);
                            calculateOverallSummary(response);
                        } else {
                            Swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function(error) {
                        console.error('Error fetching scores:', error);
                    }
                });
            }
        }
    
        // Function to display scores
        function displayScores(response) {
            console.log('Response:', response); // Debugging line
            var scoresSection = $('#scoresSection');
            scoresSection.empty();
    
            var judgesScoresTables = $('<div id="judgesScoresTables"></div>');
    
            var criteria = response.criteria;
            var scores = response.data;
    
            // Check if criteria is an array and scores is an object
            if (!Array.isArray(criteria)) {
                console.error('Criteria is not an array:', criteria);
                return;
            }
    
            if (typeof scores !== 'object') {
                console.error('Scores is not an object:', scores);
                return;
            }
    
            // Overall Summary Section
            var overallSummarySection = `
                <h1 class="text-white text-center mt-4">Overall Summary</h1>
                <table id="overallSummaryTable" class="table table-striped table-dark ">
                    <thead>
                        <tr>
                            <th>Contestant</th>
                            <th>Total Score</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Overall summary rows will be populated dynamically -->
                    </tbody>
                </table>
                
                <h1 class="fst-italic text-center text-white">Judge Scores</h1>
                <hr class="container-sm Sborder border-success border-2 opacity-50 w-50" />
            `;
    
            scoresSection.append(overallSummarySection);
    
            // Iterate over each judge
            Object.keys(scores).forEach(judgeName => {
                var judgeScores = scores[judgeName];
                
                // Calculate total scores for each contestant
                var totalScores = {};
                Object.keys(judgeScores).forEach(contestantName => {
                    var criteriaScores = judgeScores[contestantName];
                    var totalScore = 0;
    
                    criteria.forEach(function(criterion) {
                        totalScore += parseFloat(criteriaScores[criterion] || 0);
                    });
    
                    totalScores[contestantName] = totalScore;
                });
    
                // Sort contestants by their total score
                var sortedContestants = Object.keys(totalScores).sort((a, b) => totalScores[b] - totalScores[a]);
    
                var judgeTable = '';
                judgeTable += '<table class="table table-striped table-dark">';
                judgeTable += '<thead><tr><th>Contestant</th>';
    
                // Add criteria headers
                criteria.forEach(function(criterion) {
                    judgeTable += '<th>' + criterion + '</th>';
                });
                judgeTable += '<th>Total Score</th><th>Rank</th></tr></thead><tbody>';
    
                // Add scores for each contestant
                sortedContestants.forEach((contestantName, index) => {
                    var rank = index + 1;
                    var criteriaScores = judgeScores[contestantName];
                    var totalScore = totalScores[contestantName];
    
                    judgeTable += '<tr><td>' + contestantName + '</td>';
    
                    criteria.forEach(function(criterion) {
                        var score = criteriaScores[criterion] || 0;
                        judgeTable += '<td>' + score + '</td>';
                    });
    
                    judgeTable += '<td>' + totalScore.toFixed(2) + '</td>';
                    judgeTable += '<td>' + rank + '</td>';
                    judgeTable += '</tr>';
                });
    
                judgeTable += '</tbody></table>';
                judgesScoresTables.append(judgeTable);
            });
    
            scoresSection.append(judgesScoresTables);
        }
    
        // Function to calculate and display overall summary
        function calculateOverallSummary(response) {
            var summary = {};
            var scores = response.data;
    
            // Aggregate scores across all judges
            Object.keys(scores).forEach(judgeName => {
                var judgeScores = scores[judgeName];
                Object.keys(judgeScores).forEach(contestantName => {
                    var criteriaScores = judgeScores[contestantName];
                    if (!summary[contestantName]) {
                        summary[contestantName] = 0;
                    }
                    for (var criteriaName in criteriaScores) {
                        summary[contestantName] += parseFloat(criteriaScores[criteriaName]);
                    }
                });
            });
    
            var summaryArray = Object.keys(summary).map(contestantName => {
                return { contestantName: contestantName, totalScore: summary[contestantName] };
            });
    
            summaryArray.sort((a, b) => b.totalScore - a.totalScore);
    
            var overallSummaryTable = $('#overallSummaryTable tbody');
            overallSummaryTable.empty();
    
            summaryArray.forEach((item, index) => {
                var rank = index + 1;
                overallSummaryTable.append('<tr><td>' + item.contestantName + '</td><td>' + item.totalScore.toFixed(2) + '</td><td>' + rank + '</td></tr>');
            });
        }
    
        // fetchScores to event and category select change
        $('#eventSelect, #categorySelect').on('change', function() {
            fetchScores();
        });
    });
    