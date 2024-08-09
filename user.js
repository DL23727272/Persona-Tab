// --------------- FOR JUDGE SCORE TABLE --------------
$(document).ready(function() {
    var judgeID = sessionStorage.getItem('judgeID');
    document.getElementById("judgeName").innerHTML = judgeID;

    if (judgeID) {
        $.ajax({
            url: './backend/getCriteriaByJudge.php',
            type: 'GET',
            data: { judgeID: judgeID },
            dataType: 'json',
            success: function(response) {
                console.log('Criteria response:', response);

                function getPhilippinesDate() {
                    // Get the current date and time
                    const now = new Date();

                    // Convert to PHT by adding 8 hours
                    const phtDate = new Date(now.getTime() + (8 * 60 * 60 * 1000));

                    // Format date as 'YYYY-MM-DD'
                    const formattedDate = phtDate.toISOString().split('T')[0];

                    return formattedDate;
                }



                var currentDate = getPhilippinesDate(); // Get current date in 'YYYY-MM-DD' format
                console.log("date:"+currentDate);
                var showSubmitButton = false;

                if (response.categories && Array.isArray(response.categories)) {
                    $('#tablesContainer').empty(); // Clear previous tables
                    $('#submitScoresBtn').hide();
                    // Group criteria by category
                    var criteriaByCategory = {};
                    response.criteria.forEach(function(criterion) {
                        if (!criteriaByCategory[criterion.categoryID]) {
                            criteriaByCategory[criterion.categoryID] = [];
                        }
                        criteriaByCategory[criterion.categoryID].push(criterion);
                    });

                    response.categories.forEach(function(category) {
                    if (category.eventDate === currentDate) {
                        var tableHTML = `
                            <hr class="container-sm Sborder mt-5 mb-5 border-light border-2 opacity-50 w-50" />
                            <div class="d-flex flex-column align-items-center text-center">
                                <h2 class="fst-italic text-center text-white">${category.categoryName}</h2>
                                <div id="criteriaContainer-${category.categoryID}">
                                    <!-- Criteria will be dynamically inserted here -->
                                </div>
                            </div>
                            <table id="contestantTable-${category.categoryID}" class="table table-striped-columns table-dark text-center">
                                <thead>
                                    <!-- Headers will be populated dynamically -->
                                </thead>
                                <tbody>
                                    <!-- Rows will be populated dynamically -->
                                </tbody>
                            </table>`;
                        $('#tablesContainer').append(tableHTML);

                        // Generate criteria headers for each category
                        var criteria = criteriaByCategory[category.categoryID] || [];
                        var thead = '<tr><th>Contestant</th>';
                        var criteriaHeaders = criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + ' - ' + criterion.criteriaScore + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th><th>Rank</th></tr>';
                        $(`#contestantTable-${category.categoryID} thead`).html(thead);

                        // Fetch and display contestants for each category
                        fetchContestantsByCategory(judgeID, category.categoryID, criteria);
                         // Set flag to show the submit button
                         showSubmitButton = true;
                        } else if (new Date(category.eventDate) < new Date()) {
                            // Event has passed
                            $('#tablesContainer').append(`
                                <p class="text-white text-center">The event "${category.categoryName}" is now done.</p>
                            `);
                        } else {
                            // Event is still not open
                            $('#tablesContainer').append(`
                                <p class="text-white text-center">The event "${category.categoryName}" is still not open.</p>
                            `);
                        }
                    });
                    if (showSubmitButton) {
                        $('#submitScoresBtn').show(); // Show the submit button if any event is open
                    } else {
                        $('#submitScoresBtn').hide(); // Hide the submit button if no events are open
                    }
                } else {
                    console.error('Invalid categories response:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching criteria:', {
                    status: status,
                    error: error,
                    responseText: xhr.responseText
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Not Logged In',
            text: 'You need to log in to access this page.',
            confirmButtonText: 'Log In',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './index.html';
            }
        });
        return;
    }

    // Fetch contestants by category
    function fetchContestantsByCategory(judgeID, categoryID, criteria) {
        $.ajax({
            url: './backend/getContestantsByJudge.php',
            type: 'GET',
            data: { judgeID: judgeID, categoryID: categoryID },
            dataType: 'json',
            success: function(response) {
                console.log('Contestants Response for category ' + categoryID + ':', response);
    
                if (response.contestants && Array.isArray(response.contestants)) {
                    var tbody = '';
                    var existingContestants = new Set();
    
                    response.contestants.forEach(function(contestant) {
                        // Check if the contestant's category matches the current category
                        if (contestant.categoryID == categoryID && !existingContestants.has(contestant.idContestant)) {
                            existingContestants.add(contestant.idContestant);
    
                            tbody += '<tr data-contestant-id="' + contestant.idContestant + '" data-category-id="' + categoryID + '">';
                            
                            // Display contestant number if available, otherwise display name
                            if (contestant.contestantNo) {
                                tbody += '<td>' + contestant.contestantNo + '</td>';
                            } else {
                                tbody += '<td>' + contestant.name + '</td>';
                            }
    
                            if (Array.isArray(criteria)) {
                                criteria.forEach(function(criterion) {
                                    tbody += '<td><input type="number" class="score-input" data-contestant-id="' 
                                    + contestant.idContestant + '" data-criterion-id="' + criterion.criteriaID + 
                                    '" data-category-id="' + categoryID + '" style="width: 60px" required/></td>';
                                });
                            }
    
                            tbody += '<td class="total-score">0</td>'; // Placeholder for Total Score
                            tbody += '<td class="contestant-rank">0</td>'; // Placeholder for Rank
                            tbody += '</tr>';
                        }
                    });
    
                    $(`#contestantTable-${categoryID} tbody`).html(tbody);
    
                    // Add event listeners for score input fields
                    $('.score-input').on('input', function() {
                        calculateAndUpdateScoresAndRanks();
                    });
                } else {
                    console.error('Invalid contestants response:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching contestants:', {
                    status: status,
                    error: error,
                    responseText: xhr.responseText
                });
            }
        });
    }
    

    // Calculate total scores and ranks within each category
    function calculateAndUpdateScoresAndRanks() {
        var categoryContestants = {};

        // Calculate total scores and group contestants by category
        $('[id^=contestantTable-] tbody tr').each(function() {
            var contestantID = $(this).data('contestant-id');
            var categoryID = $(this).data('category-id'); 
            var totalScore = 0;

            $(this).find('.score-input').each(function() {
                var score = parseInt($(this).val()) || 0;
                totalScore += score;
            });

            if (!categoryContestants[categoryID]) {
                categoryContestants[categoryID] = [];
            }

            categoryContestants[categoryID].push({
                id: contestantID,
                name: $(this).find('td:first').text(),
                totalScore: totalScore
            });

            $(this).find('.total-score').text(totalScore);
        });

        $.each(categoryContestants, function(categoryID, contestants) {
            contestants.sort(function(a, b) {
                return b.totalScore - a.totalScore;
            });

            contestants.forEach(function(contestant, index) {
                var rank = index + 1;
                $(`#contestantTable-${categoryID} tbody tr[data-contestant-id="${contestant.id}"]`).find('.contestant-rank').text(rank);
            });
        });
    }

    function saveScores() {
        var judgeID = sessionStorage.getItem('judgeID');

        if (!judgeID) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You need to log in to submit scores.',
                confirmButtonText: 'Log In',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './index.html';
                }
            });
            return;
        } else {
            var scoresData = [];

            $('[id^=contestantTable-] tbody tr').each(function() {
                var contestantID = $(this).data('contestant-id');
                var categoryID = $(this).data('category-id');

                $(this).find('.score-input').each(function() {
                    var score = parseInt($(this).val()) || 0;
                    var criterionID = $(this).data('criterion-id');

                    scoresData.push({
                        judgeID: judgeID,
                        contestantID: contestantID,
                        categoryID: categoryID,
                        criterionID: criterionID,
                        score: score,
                        rank: $(this).closest('tr').find('.contestant-rank').text()
                    });
                });
            });

            $.ajax({
                url: './backend/saveScores.php',
                type: 'POST',
                data: { scores: JSON.stringify(scoresData) },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX error:', status, error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while saving scores. Please try again.'
                    });
                }
            });
        }
    }

    $('#scoringForm').on('submit', function(event) {
        event.preventDefault();
        saveScores();
    });
});


// --------------- END FOR JUDGE SCORE TABLE --------------




// ----------------   -Fetch Event Description based on what they are in    --------------------------------------//

$(document).ready(function() {
    const judgeID = sessionStorage.getItem('judgeID');
    console.log('Judge ID from session storage:', judgeID);

    // Check if userId exists
    if (judgeID) {
        $.ajax({
            url: './backend/fetchEventDesc.php',
            type: 'POST',
            data: { judgeID: judgeID },
            dataType: 'json',
            success: function(response) {
                console.log(response); 
                if (response.status === 'success') {
                    $('.eventImage').attr('src', './EventUploads/' + response.data.eventImage);
                    $('.eventDescription').text(response.data.eventDescription);
                    $('.heroEventName').text(response.data.eventName);
                    $('.heroEventDate').text(response.data.eventDate);
                } else {
                    // Handle errors or no data found
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
            }
        });
    } else {
        console.error('Judge ID not found in session storage.');
    }
});


    
/* --------------- FOR JUDGE SCORE TABLE -------------- working version
$(document).ready(function() {
    var judgeID = sessionStorage.getItem('judgeID');
    document.getElementById("judgeName").innerHTML = judgeID;

    if (judgeID) {
        $.ajax({
            url: './backend/getCriteriaByJudge.php',
            type: 'GET',
            data: { judgeID: judgeID },
            dataType: 'json',
            success: function(response) {
                console.log('Criteria response:', response);

                if (response.categories && Array.isArray(response.categories)) {
                    $('#tablesContainer').empty(); // Clear previous tables

                    // Group criteria by category
                    var criteriaByCategory = {};
                    response.criteria.forEach(function(criterion) {
                        if (!criteriaByCategory[criterion.categoryID]) {
                            criteriaByCategory[criterion.categoryID] = [];
                        }
                        criteriaByCategory[criterion.categoryID].push(criterion);
                    });

                    response.categories.forEach(function(category) {
                        var tableHTML = `
                            <hr class="container-sm Sborder mt-5 mb-5 border-light border-2 opacity-50 w-50" />
                            <div class="d-flex flex-column align-items-center text-center">
                                <h2 class="fst-italic text-center text-white">${category.categoryName}</h2>
                                <div id="criteriaContainer-${category.categoryID}">
                                    <!-- Criteria will be dynamically inserted here -->
                                </div>
                            </div>
                            <table id="contestantTable-${category.categoryID}" class="table table-striped-columns table-dark text-center">
                                <thead>
                                    <!-- Headers will be populated dynamically -->
                                </thead>
                                <tbody>
                                    <!-- Rows will be populated dynamically -->
                                </tbody>
                            </table>`;
                        $('#tablesContainer').append(tableHTML);

                        // Generate criteria headers for each category
                        var criteria = criteriaByCategory[category.categoryID] || [];
                        var thead = '<tr><th>Contestant</th>';
                        var criteriaHeaders = criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + ' - ' + criterion.criteriaScore + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th><th>Rank</th></tr>';
                        $(`#contestantTable-${category.categoryID} thead`).html(thead);

                        // Fetch and display contestants for each category
                        fetchContestantsByCategory(judgeID, category.categoryID, criteria);
                    });
                } else {
                    console.error('Invalid categories response:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching criteria:', {
                    status: status,
                    error: error,
                    responseText: xhr.responseText
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Not Logged In',
            text: 'You need to log in to access this page.',
            confirmButtonText: 'Log In',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './index.html';
            }
        });
        return;
    }

    // Fetch contestants by category
    function fetchContestantsByCategory(judgeID, categoryID, criteria) {
        $.ajax({
            url: './backend/getContestantsByJudge.php',
            type: 'GET',
            data: { judgeID: judgeID, categoryID: categoryID },
            dataType: 'json',
            success: function(response) {
                console.log('Contestants Response for category ' + categoryID + ':', response);
    
                if (response.contestants && Array.isArray(response.contestants)) {
                    var tbody = '';
                    var existingContestants = new Set();
    
                    response.contestants.forEach(function(contestant) {
                        // Check if the contestant's category matches the current category
                        if (contestant.categoryID == categoryID && !existingContestants.has(contestant.idContestant)) {
                            existingContestants.add(contestant.idContestant);
    
                            tbody += '<tr data-contestant-id="' + contestant.idContestant + '" data-category-id="' + categoryID + '">';
                            
                            // Display contestant number if available, otherwise display name
                            if (contestant.contestantNo) {
                                tbody += '<td>' + contestant.contestantNo + '</td>';
                            } else {
                                tbody += '<td>' + contestant.name + '</td>';
                            }
    
                            if (Array.isArray(criteria)) {
                                criteria.forEach(function(criterion) {
                                    tbody += '<td><input type="number" class="score-input" data-contestant-id="' 
                                    + contestant.idContestant + '" data-criterion-id="' + criterion.criteriaID + 
                                    '" data-category-id="' + categoryID + '" style="width: 60px" required/></td>';
                                });
                            }
    
                            tbody += '<td class="total-score">0</td>'; // Placeholder for Total Score
                            tbody += '<td class="contestant-rank">0</td>'; // Placeholder for Rank
                            tbody += '</tr>';
                        }
                    });
    
                    $(`#contestantTable-${categoryID} tbody`).html(tbody);
    
                    // Add event listeners for score input fields
                    $('.score-input').on('input', function() {
                        calculateAndUpdateScoresAndRanks();
                    });
                } else {
                    console.error('Invalid contestants response:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching contestants:', {
                    status: status,
                    error: error,
                    responseText: xhr.responseText
                });
            }
        });
    }
    

    // Calculate total scores and ranks within each category
    function calculateAndUpdateScoresAndRanks() {
        var categoryContestants = {};

        // Calculate total scores and group contestants by category
        $('[id^=contestantTable-] tbody tr').each(function() {
            var contestantID = $(this).data('contestant-id');
            var categoryID = $(this).data('category-id'); 
            var totalScore = 0;

            $(this).find('.score-input').each(function() {
                var score = parseInt($(this).val()) || 0;
                totalScore += score;
            });

            if (!categoryContestants[categoryID]) {
                categoryContestants[categoryID] = [];
            }

            categoryContestants[categoryID].push({
                id: contestantID,
                name: $(this).find('td:first').text(),
                totalScore: totalScore
            });

            $(this).find('.total-score').text(totalScore);
        });

        $.each(categoryContestants, function(categoryID, contestants) {
            contestants.sort(function(a, b) {
                return b.totalScore - a.totalScore;
            });

            contestants.forEach(function(contestant, index) {
                var rank = index + 1;
                $(`#contestantTable-${categoryID} tbody tr[data-contestant-id="${contestant.id}"]`).find('.contestant-rank').text(rank);
            });
        });
    }

    function saveScores() {
        var judgeID = sessionStorage.getItem('judgeID');

        if (!judgeID) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You need to log in to submit scores.',
                confirmButtonText: 'Log In',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './index.html';
                }
            });
            return;
        } else {
            var scoresData = [];

            $('[id^=contestantTable-] tbody tr').each(function() {
                var contestantID = $(this).data('contestant-id');
                var categoryID = $(this).data('category-id');

                $(this).find('.score-input').each(function() {
                    var score = parseInt($(this).val()) || 0;
                    var criterionID = $(this).data('criterion-id');

                    scoresData.push({
                        judgeID: judgeID,
                        contestantID: contestantID,
                        categoryID: categoryID,
                        criterionID: criterionID,
                        score: score,
                        rank: $(this).closest('tr').find('.contestant-rank').text()
                    });
                });
            });

            $.ajax({
                url: './backend/saveScores.php',
                type: 'POST',
                data: { scores: JSON.stringify(scoresData) },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX error:', status, error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while saving scores. Please try again.'
                    });
                }
            });
        }
    }

    $('#scoringForm').on('submit', function(event) {
        event.preventDefault();
        saveScores();
    });
});
*/