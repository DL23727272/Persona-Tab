
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

      document.addEventListener("DOMContentLoaded", function() {
        var judgeID = sessionStorage.getItem('judgeID');
        var judgeName = sessionStorage.getItem('customerName');
        
        // Check if customerID is present
        if (judgeID) {
        
          console.log('Judge ID: ' + judgeID)
          console.log('Judge Name: ' + judgeName);
          document.getElementById("judgeName").innerHTML = judgeName;
           
        } else {
            console.log('Customer ID not found in sessionStorage'); 
        }
    });


      // --------------- ADDING EVENTS et al AJAX --------------
    $(document).ready(function() {
        var judgeID = sessionStorage.getItem('judgeID');
        if (judgeID) {
            // Handle form submission for adding event
            $('#addEventForm').submit(function(e) {
                e.preventDefault();
                var formData = $(this).serialize();
                $.ajax({
                    url: './backend/addEvent.php', 
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
                    url: './backend/addCategory.php', 
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
                url: './backend/addCriteria.php', 
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
                url: './backend/addJudge.php', 
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

        }else{
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
            url: './backend/getCategories.php', 
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
                    categoryDropdown.append(defaultOption); 
                    
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
        var judgeID = sessionStorage.getItem('judgeID');
        if (judgeID) {
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
        }else{
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
                    // Redirect to login page or show login modal
                    window.location.href = './index.html';
                }
            });
            return;
        }
    });
    // --------------- END FOR CONTENT SECTION --------------
    

 // --------------- FOR ADD JUDGE TO CATEGORY --------------
    $(document).ready(function() {
        var judgeID = sessionStorage.getItem('judgeID');
        if (judgeID) {

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

        }else{
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
                    // Redirect to login page or show login modal
                    window.location.href = './index.html'; 
                }
            });
            return;
        }
    });
    // ---------------END FOR ADD JUDGE TO CATEGORY --------------


 // --------------- FOR ADD CONTESTANT TO CATEGORY --------------
    $(document).ready(function() {
        var judgeID = sessionStorage.getItem('judgeID');
        if (judgeID) {
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
        }else{
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

    });
    // ---------------END FOR ADD CONTESTANT TO CATEGORY --------------

    
    // --------------- FOR ADMIN UPDATE JUDGE SCORE TABLE --------------
    $(document).ready(function() {
        let originalScores = {}; // Store original scores to compare
    
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
                    $('#eventUpdateSelect').html(options);
                },
                error: function(xhr, status, error) {
                    console.error('Error loading events:', status, error);
                    alertify.error('Error loading events.');
                }
            });
        }
    
        function loadCategories(eventID) {
            $.ajax({
                url: './backend/adminGetCategories.php',
                method: 'GET',
                data: { eventID: eventID },
                dataType: 'json',
                success: function(data) {
                    var options = '<option value="#" disabled selected>--- Select Category ---</option>';
                    $.each(data, function(index, category) {
                        options += '<option value="' + category.categoryID + '">' + category.categoryName + '</option>';
                    });
                    $('#categoryUpdateSelect').html(options);
                },
                error: function(xhr, status, error) {
                    console.error('Error loading categories:', status, error);
                    alertify.error('Error loading categories.');
                }
            });
        }
    
        function loadJudges(categoryID) {
            $.ajax({
                url: './backend/getJudgesByCategory.php',
                method: 'GET',
                data: { categoryID: categoryID },
                dataType: 'json',
                success: function(data) {
                    var options = '<option value="#" disabled selected>--- Select Judge ---</option>';
                    $.each(data, function(index, judge) {
                        options += '<option value="' + judge.judgeID + '">' + judge.judgeName + '</option>';
                    });
                    $('#judgeUpdateSelect').html(options);
                },
                error: function(xhr, status, error) {
                    console.error('Error loading judges:', status, error);
                    alertify.error('Error loading judges.');
                }
            });
        }
    
        function loadCriteria(judgeID, categoryID) {
            $.ajax({
                url: './backend/adminGetCriteriaByJudge.php',
                method: 'GET',
                data: { judgeID: judgeID, categoryID: categoryID },
                dataType: 'json',
                success: function(data) {
                    if (data.criteria && Array.isArray(data.criteria)) {
                        var thead = '<tr><th>Contestant Name</th>';
                        var criteriaHeaders = data.criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th></tr>';
                        $('#contestantTable thead').html(thead);
    
                        // Update category name
                        $('#categoryName').text(data.categoryName || 'Category');
    
                        // Fetch scores after criteria are loaded
                        fetchScoresByJudge(judgeID, data.criteria);
                    } else {
                        console.error('Invalid criteria response:', data);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error loading criteria:', status, error);
                    alertify.error('Error loading criteria.');
                }
            });
        }
    
        function fetchScoresByJudge(judgeID, criteria) {
            $.ajax({
                url: './backend/getScoresByJudge.php',
                method: 'GET',
                data: { judgeID: judgeID, categoryID: $('#categoryUpdateSelect').val() },
                dataType: 'json',
                success: function(data) {
                    if (data.scores && Array.isArray(data.scores)) {
                        originalScores = {}; // Reset original scores
                        var tbody = '';
                        var contestantScores = {};
    
                        // Initialize contestant data
                        data.scores.forEach(function(score) {
                            if (!contestantScores[score.contestantID]) {
                                contestantScores[score.contestantID] = {
                                    idContestant: score.contestantID,
                                    name: score.contestantName,
                                    scores: {},
                                    totalScore: 0
                                };
                            }
                            contestantScores[score.contestantID].scores[score.criteriaName] = score.score;
                            originalScores[score.contestantID] = originalScores[score.contestantID] || {};
                            originalScores[score.contestantID][score.criteriaID] = score.score;
                        });
    
                        // Generate rows for each contestant
                        Object.values(contestantScores).forEach(function(contestant) {
                            var rowHtml = '<tr data-contestant-id="' + contestant.idContestant + '">';
                            rowHtml += '<td>' + contestant.name + '</td>';
    
                            // Display scores based on criteria
                            criteria.forEach(function(criterion) {
                                var score = contestant.scores[criterion.criteriaName] || 0;
                                rowHtml += '<td><input type="number" class="score-input" data-contestant-id="' + contestant.idContestant +
                                            '" data-criterion-name="' + criterion.criteriaName +
                                             '" data-criterion-id="' + criterion.criteriaID + 
                                             '" value="' + score + '"></td>';
                            });
    
                            var totalScore = Object.values(contestant.scores).reduce(function(sum, score) {
                                return sum + score;
                            }, 0);
                            rowHtml += '<td>' + totalScore + '</td>';
                            rowHtml += '</tr>';
                            tbody += rowHtml;
                        });
    
                        $('#contestantTable tbody').html(tbody);
                    } else {
                        console.error('Invalid scores response:', data);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching scores:', status, error);
                    alertify.error('Error fetching scores.');
                }
            });
        }
    
        $('#eventUpdateSelect').change(function() {
            var eventID = $(this).val();
            if (eventID) {
                loadCategories(eventID);
                $('#categoryUpdateSelect').empty().append('<option value="#" disabled selected>--- Select Category ---</option>');
                $('#judgeUpdateSelect').empty().append('<option value="#" disabled selected>--- Select Judge ---</option>');
                $('#contestantTable thead').empty();
                $('#contestantTable tbody').empty();
            }
        });
    
        $('#categoryUpdateSelect').change(function() {
            var categoryID = $(this).val();
            if (categoryID) {
                loadJudges(categoryID);
                $('#judgeUpdateSelect').empty().append('<option value="#" disabled selected>--- Select Judge ---</option>');
                $('#contestantTable thead').empty();
                $('#contestantTable tbody').empty();
            }
        });
    
        $('#judgeUpdateSelect').change(function() {
            var judgeID = $(this).val();
            var categoryID = $('#categoryUpdateSelect').val(); // Get selected category ID
            if (judgeID && categoryID) {
                loadCriteria(judgeID, categoryID);
            }
        });
    
        $('#scoringForm').submit(function(event) {
            event.preventDefault();
    
            var scores = [];
            var hasChanges = false;
            $('#contestantTable tbody tr').each(function() {
                var contestantID = $(this).data('contestant-id');
                var scoreData = { contestantID: contestantID, scores: {} };
    
                $(this).find('.score-input').each(function() {
                    var criterionID = $(this).data('criterion-id');
                    var score = $(this).val();
                    if (score) {
                        scoreData.scores[criterionID] = parseFloat(score);
    
                        // Compare with original scores
                        if (originalScores[contestantID] && originalScores[contestantID][criterionID] !== parseFloat(score)) {
                            hasChanges = true;
                        }
                    }
                });
    
                scores.push(scoreData);
            });
    
            if (!hasChanges) {
                Swal.fire({
                    title: 'No Changes!',
                    text: 'There are no changes to update.',
                    icon: 'info'
                });
                return;
            }
    
            console.log("Scores data being sent:", scores); // Log scores data
    
            $.ajax({
                url: './backend/updateScores.php',
                method: 'POST',
                data: { scores: JSON.stringify(scores) },
                dataType: 'json',
                success: function(data) {
                    if (data.success) {
                        Swal.fire({
                            title: 'Success!',
                            text: data.message,
                            icon: 'success'
                        }).then(function() {
                            // Reload the table with updated scores
                            fetchScoresByJudge($('#judgeUpdateSelect').val(), $('#categoryUpdateSelect').val());
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: data.message,
                            icon: 'error'
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error updating scores:', status, error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error updating scores.',
                        icon: 'error'
                    });
                }
            });
        });
    
        // Initial load
        loadEvents();
    });
    
    
    
    
    // --------------- END FOR ADMIN UPDATE JUDGE SCORE TABLE --------------


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
            <h1 class="text-white text-center mt-5">Overall Summary</h1>
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
            
            <h1 class="fst-italic text-center text-white mt-4">Judge Scores</h1>
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

            var judgeTable = '<h4 class="text-white fw-bold mt-5">JUDGE: ' + judgeName + '</h4>';
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

