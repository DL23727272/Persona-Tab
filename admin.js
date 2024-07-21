
      // For navbar
      window.onscroll = function () { scrollFunction() };

      function scrollFunction() {
          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
              document.getElementById("navbar").classList.add("blurred");
              const navLinks = document.querySelectorAll(".nav-link");
              navLinks.forEach(link => link.classList.add("scrolled"));
              document.getElementById("mugIcon").classList.add("scrolled");
          } else {
              document.getElementById("navbar").classList.remove("blurred");
              const navLinks = document.querySelectorAll(".nav-link");
              navLinks.forEach(link => link.classList.remove("scrolled"));
              document.getElementById("mugIcon").classList.remove("scrolled");
          }
      }
      // End of function for navbar




      // --------------- ADDING AJAX --------------
    $(document).ready(function() {

        // Handle form submission for adding event
        $('#addEventForm').submit(function(e) {
            e.preventDefault();
            var formData = $(this).serialize();
            $.ajax({
                url: './backend/addEvent.php', // Update to the correct path
                method: 'POST',
                data: formData,
                success: function(response) {
                    console.log(response); // Log the full response
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function() {
                            $('#addEventModal').modal('hide');
                            $('#addEventForm')[0].reset();
                            // Optionally, reload the list of events
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: response.message
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText); // Log the error details
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add event.'
                    });
                }
            });
        });
    


        // Handle form submission for ADDING CATEGORY
        $('#addCategoryForm').submit(function(e) {
            e.preventDefault(); // Prevent the default form submission
            var formData = $(this).serialize(); // Serialize form data
        
            $.ajax({
                url: './backend/addCategory.php', // Change to your server-side script
                method: 'POST',
                data: formData,
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function() {
                            $('#addCategoryModal').modal('hide');
                            $('#addCategoryForm')[0].reset(); // Clear the form fields
                            // Optionally, reload the list of categories
                            loadCategories();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: response.message
                        });
                    }
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add category.'
                    });
                }
            });
        });
        

        // Handle form submission for adding criteria
        $('#addCriteriaForm').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: './backend/addCriteria.php', // Change to your server-side script
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function() {
                        $('#addCriteriaModal').modal('hide');
                        $('#addCriteriaForm')[0].reset();
                        // Optionally, reload the list of criteria
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: response.message
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add criteria.'
                });
            }
        });
        });

        // Handle form submission for adding judge
        $('#addJudgeForm').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: './backend/addJudge.php', // Change to your server-side script
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function() {
                        $('#addJudgeModal').modal('hide');
                        $('#addJudgeForm')[0].reset();
                        // Optionally, reload the list of judges
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: response.message
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add judge.'
                });
            }
        });
        });


    });
    // --------------- END ADDING AJAX --------------

    // --------------- LOAD EVENTS AND CATEGORIES --------------
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
                $('#categoryEvent').html(options);
               
            },
            error: function() {
                alertify.error('Error loading events.');
            }
        });
    }
    
      
    function loadCategories() {
        $.ajax({
            url: './backend/getCategories.php', // Ensure the path is correct
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (Array.isArray(response)) {
                    // Process the categories array
                    console.log(response);
                    
                    // Define the default option
                    var defaultOption = '<option value="#" disabled selected>--- Select Category ---</option>';
                    
                    // Populate the dropdown
                    let categoryDropdown = $('#criteriaCategory');
                    categoryDropdown.empty(); // Clear existing options
                    categoryDropdown.append(defaultOption); // Add default option
                    
                    // Add categories from the response
                    response.forEach(category => {
                        categoryDropdown.append(new Option(category.categoryName, category.categoryID));
                    });
                } else {
                    console.error(response.message); // Handle error message
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ' + status + error);
            }
        });
    
    }
      
      $(document).ready(function() {
          loadEvents();
          loadCategories();
      });

    // ---------------END LOAD EVENTS AND CATEGORIES --------------


    // --------------- FOR PASSWORD TOGGLE --------------
      
      document.addEventListener('DOMContentLoaded', function () {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('judgePassword');
        const eyeIcon = document.getElementById('eyeIcon');
      
        togglePassword.addEventListener('click', function () {
          // Toggle the type attribute
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
      
          // Toggle the eye icon
          if (type === 'password') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
          } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
          }
        });
      });
    // --------------- END FOR PASSWORD TOGGLE --------------
     


    // --------------- FOR CONTENT SECTION --------------
    $(document).ready(function() {
        // Function to fetch events and populate the dropdown
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
    });
    // --------------- END FOR CONTENT SECTION --------------
    

 // --------------- FOR ADD JUDGE TO CATEGORY --------------
    $(document).ready(function() {

        // Fetch JUdges
        function populateSelect(url, selectId) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    var select = $(selectId);
                    select.empty();
                    // Add the placeholder option
                    select.append('<option value="#" disabled selected>--- Select Judge ---</option>');
                    // Add the options from the AJAX response
                    data.forEach(function(item) {
                        select.append('<option value="' + item.judgeID + '">' + item.judgeName + '</option>');
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error: ' + textStatus + ' - ' + errorThrown);
                }
            });
        }
        
    
        populateSelect('./backend/getJudges.php', '#judgeSelect');
        populateSelect('./backend/getJudges.php', '#judgeScore');


        //Assign triggers form
        $('#assignJudgeForm').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: './backend/assignJudge.php',
                type: 'POST',
                data: $(this).serialize(),
                dataType: 'json', // Ensure jQuery parses the response as JSON
                success: function(response) {
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message,
                            confirmButtonText: 'OK'
                        });
                        $('#assignJudgeForm')[0].reset();
                    } else if (response.status === 'error') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message,
                            confirmButtonText: 'OK'
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error: ' + textStatus + ' - ' + errorThrown);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An unexpected error occurred.',
                        confirmButtonText: 'OK'
                    });
                }
            });
        });
        

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
                    $('#eventJudgeSelect').html(options);
                    
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
                    $('#categoryJudgeSelect').html(options);
                },
                error: function() {
                    alertify.error('Error loading categories.');
                }
            });
        }

        // Call loadEvents on page load
        loadEvents();

        // Event listener for event selection change
        $('#eventJudgeSelect').change(function() {
            var eventID = $(this).val();
            if (eventID) {
                loadCategories(eventID);
            }
        });
    });
    // ---------------END FOR ADD JUDGE TO CATEGORY --------------


 // --------------- FOR ADD CONTESTANT TO CATEGORY --------------
    $(document).ready(function() {
        // Populate category dropdown
        $.ajax({
            url: './backend/getCategories.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (Array.isArray(response)) {
                    let categoryDropdown = $('#category');
                    categoryDropdown.empty();
                    categoryDropdown.append('<option value="#" disabled selected>--- Select Category ---</option>');
                    response.forEach(category => {
                        categoryDropdown.append(new Option(category.categoryName, category.categoryID)); // Ensure correct value
                    });
                } else {
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ' + status + error);
            }
        });
        

        // Handle form add submission
        $('#contestantForm').submit(function(e) {
            e.preventDefault();
        
            var formData = new FormData(this);
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ': '+ pair[1]); // Debug form data
            }
        
            $.ajax({
                url: './backend/addContestant.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log(response);
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message,
                        });
                        $('#contestantForm')[0].reset();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message,
                        });
                    }
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error adding contestant.',
                    });
                }
            });
        });
        

    });
    // ---------------END FOR ADD CONTESTANT TO CATEGORY --------------

    // --------------- FOR ADMIN UPDATE JUDGE SCORE TABLE --------------
    $(document).ready(function() {
        $('#judgeScore').change(function() {
            var judgeID = $(this).val();

            $.ajax({
                url: './backend/getCriteriaByJudge.php',
                type: 'GET',
                data: { judgeID: judgeID },
                dataType: 'json',
                success: function(response) {
                    if (response.criteria && Array.isArray(response.criteria)) {
                        // Generate table headers based on criteria
                        var thead = '<tr><th>Contestant Name</th>';
                        var criteriaHeaders = response.criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th><th>Rank</th></tr>';
                        $('#contestantTable thead').html(thead);

                        // Clear previous rows
                        $('#contestantTable tbody').empty();

                        // Fetch and display contestants based on selected judge
                        fetchScoresByJudge(judgeID, response.criteria);
                        console.log(judgeID, response.criteria);
                    } else {
                        console.error('Invalid criteria response:', response);
                    }

                    if (response.categories && Array.isArray(response.categories)) {
                        // Update the category name in the H1 tag
                        var categoryName = response.categories.map(function(category) {
                            return category.categoryName;
                        }).join(', ');
                        $('#categoryName').text(categoryName);
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
        });


        // Fetch scores by judge
        function fetchScoresByJudge(judgeID, criteria) {
            $.ajax({
                url: './backend/getScoresByJudge.php',
                type: 'GET',
                data: { judgeID: judgeID },
                dataType: 'json',
                success: function(response) {
                    console.log('Scores Response:', response);
                    if (response.scores && Array.isArray(response.scores)) {
                        var tbody = '';
                        var contestantScores = {};
        
                        // Initialize contestant data
                        response.scores.forEach(function(score) {
                            if (!contestantScores[score.contestantID]) {
                                contestantScores[score.contestantID] = {
                                    idContestant: score.contestantID,
                                    name: score.name,
                                    scores: {}, // To store scores based on criteria
                                    totalScore: 0,
                                    categoryID: score.categoryID // Ensure this is included
                                };
                            }
                            contestantScores[score.contestantID].scores[score.criterionID] = score.score;
                        });
        
                        // Generate rows for each contestant
                        Object.values(contestantScores).forEach(function(contestant) {
                            var rowHtml = '<tr data-contestant-id="' + contestant.idContestant + '" data-category-id="' + contestant.categoryID + '">';
                            rowHtml += '<td>' + contestant.name + '</td>';
        
                            // Ensure criteria is defined and iterate over it
                            if (Array.isArray(criteria)) {
                                criteria.forEach(function(criterion) {
                                    var score = contestant.scores[criterion.criteriaID] || 0; // Get score for the criterion
                                    rowHtml += '<td><input type="number" class="score-input" data-contestant-id="' 
                                    + contestant.idContestant + '" data-criterion-id="' + criterion.criteriaID + 
                                    '" value="' + score + '" /></td>';
                                    
                                    // Update total score
                                    contestant.totalScore += score;
                                });
                            }
        
                            rowHtml += '<td class="total-score">' + contestant.totalScore + '</td>'; // Display total score
                            rowHtml += '<td class="contestant-rank">N/A</td>'; // Placeholder for Rank
                            rowHtml += '</tr>';
                            
                            tbody += rowHtml;
                        });
        
                        $('#contestantTable tbody').html(tbody);
        
                        // Add event listeners for score input fields
                        $('.score-input').on('input', function() {
                            calculateAndUpdateScoresAndRanks();
                        });
        
                        // Update scores and ranks
                        calculateAndUpdateScoresAndRanks();
                    } else {
                        console.error('Invalid scores response:', response);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching scores:', {
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
            $('#contestantTable tbody tr').each(function() {
                var contestantID = $(this).data('contestant-id');
                var categoryID = $(this).data('category-id'); // Ensure this is set
                var totalScore = 0;

                $(this).find('.score-input').each(function() {
                    var score = parseInt($(this).val()) || 0;
                    totalScore += score;
                });

                // Initialize category data if not present
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

            // Sort contestants by total score and update ranks within each category
            $.each(categoryContestants, function(categoryID, contestants) {
                // Sort contestants by total score in descending order
                contestants.sort(function(a, b) {
                    return b.totalScore - a.totalScore;
                });

                // Update ranks
                contestants.forEach(function(contestant, index) {
                    var rank = index + 1;
                    $('#contestantTable tbody tr[data-contestant-id="' + contestant.id + '"]').find('.contestant-rank').text(rank);
                });
            });
        }
        

        //UpdateScores
        function updateScores() {
            var scoresData = [];
        
            $('#contestantTable tbody tr').each(function() {
                var contestantID = $(this).data('contestant-id');
                var categoryID = $(this).data('category-id'); // Ensure this is set
        
                $(this).find('.score-input').each(function() {
                    var score = parseInt($(this).val()) || 0;
                    var criterionID = $(this).data('criterion-id');
                    var judgeID = $('#judgeScore').val(); // Get the judgeID from the dropdown
        
                    // Check if categoryID is undefined or null
                    if (categoryID === undefined || categoryID === null) {
                        console.error('Category ID is missing for contestant:', contestantID);
                        return; // Skip this iteration if categoryID is missing
                    }
        
                    scoresData.push({
                        judgeID: judgeID,
                        contestantID: contestantID,
                        categoryID: categoryID, // Include categoryID
                        criterionID: criterionID,
                        score: score,
                        rank: $(this).closest('tr').find('.contestant-rank').text()
                    });
                });
            });
        
            console.log(scoresData); // Log to verify correct data
        
            $.ajax({
                url: './backend/updateScores.php',
                type: 'POST',
                data: { scores: JSON.stringify(scoresData) },
                dataType: 'json',
                success: function(response) {
                    console.log('Response:', response); // Log response for debugging
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
                    console.error('Response:', xhr.responseText); // Log raw response for debugging
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while saving scores. Please try again.'
                    });
                }
            });
        }
        
        // Attach updateScores to form submission
        $('#scoringForm').on('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            updateScores(); // Call updateScores function
        });    


    });
    // --------------- END FOR ADMIN UPDATE JUDGE SCORE TABLE --------------
