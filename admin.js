
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


      // --------------- ADDING EVENTS, CATEGORIES, CRITERIA JUDGE AJAX --------------
        $(document).ready(function() {
            var judgeID = sessionStorage.getItem('judgeID');
            if (judgeID) {

        
                // Handle form submission for adding event
                $('#addEventForm').submit(function(e) {
                    e.preventDefault(); 
        
                    var formData = new FormData(this);
                    formData.append('eventDate', $('#eventDate').val());
        
                    $.ajax({
                        url: './backend/addEvent.php',
                        method: 'POST',
                        data: formData,
                        processData: false, 
                        contentType: false, 
                        success: function(response) {
                            console.log(response); 
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
                                    loadEvents(); // Refresh event dropdown
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
                            console.error(xhr.responseText);
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
                                    loadCategories(); // Refresh category dropdown
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
                                    loadCategories(); // Refresh category dropdown if criteria are added
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
        
        });
    // --------------- END ADDING AJAX --------------

    

    // --------------- LOAD EVENTS For adding category--------------
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
                    loadEventCategories();
                },
                error: function() {
                    alertify.error('Error loading events.');
                }
            });
        }
    // ---------------END LOAD EVENTS For adding category--------------



    // --------------- LOAD Categories For adding criteria--------------
        var selectEvent = $('#criteriaSelectCategory'); 
        selectEvent.empty(); 
        selectEvent.append('<option value="#" disabled selected>--- Select an Event First ---</option>'); 

        $('#criteriaSelectEvent').change(function() {
            var eventID = $(this).val();
            var categoryDropdown = $('#criteriaSelectCategory');
        
            if (eventID && eventID !== "#") {
                loadCategories(eventID);
                categoryDropdown.prop('disabled', false); 
            } else {
                categoryDropdown.empty(); 
                categoryDropdown.append('<option value="#" disabled selected>Select an Event First</option>');
                categoryDropdown.prop('disabled', true); 
            }
        });

        // Function to load events into the event dropdown
        function loadEventCategories() {
            $.ajax({
                url: './backend/getEvents.php',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    var selectEvent = $('#criteriaSelectEvent'); 
                    selectEvent.empty(); 
                    selectEvent.append('<option value="#" disabled selected>--- Select Event ---</option>'); 
    
                    response.forEach(function(event) {
                        selectEvent.append(`<option value="${event.eventID}">${event.eventName}</option>`); 
                    });
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to load events.'
                    });
                }
            });
        }

        // Function to load categories based on the selected event
        function loadCategories(eventID) {
            $.ajax({
                url: './backend/getCategoryDetails.php', 
                method: 'GET',
                data: { eventID: eventID },
                dataType: 'json',
                success: function(response) {
                    if (Array.isArray(response)) {
                        console.log("SUCCESS",response); 
                        var defaultOption = '<option value="#" disabled selected>--- Select Category ---</option>';
                        let categoryDropdown = $('#criteriaSelectCategory');
                        categoryDropdown.empty(); 
                        categoryDropdown.append(defaultOption);
                        response.forEach(category => {
                            categoryDropdown.append(new Option(category.categoryName, category.categoryID));
                        });
                    } else {
                        console.error(response.message); 
                    }
                },
               
            });
        }

    // --------------- END LOAD Categories For adding criteria--------------


        //-------- Call the functions ------------------------
        $(document).ready(function() {
            loadEventCategories();
            loadEvents();
        });

    // -----------------------END LOAD EVENTS AND CATEGORIES ------------------------------------------------------




    
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

            // Function to populate judge select dropdown
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

            // Initial population of judge select dropdowns
            function loadJudges() {
                populateSelect('./backend/getJudges.php', '#judgeSelect');
                populateSelect('./backend/getJudges.php', '#judgeScore');
            }
            loadJudges(); // Call initially to load judges

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
                                loadJudges(); // Refresh judges in dropdowns
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
                        console.error(xhr.responseText);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to add judge.'
                        });
                    }
                });
            });

            // Assign triggers form
            $('#assignJudgeForm').on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    url: './backend/assignJudge.php',
                    type: 'POST',
                    data: $(this).serialize(),
                    dataType: 'json', 
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

            // Load events and categories
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

            function loadCategories(eventID) {
                $.ajax({
                    url: './backend/adminGetCategories.php',
                    method: 'GET',
                    data: { eventID: eventID },
                    dataType: 'json',
                    success: function(data) {
                        var filteredCategories = data;
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

            loadEvents();

            $('#eventJudgeSelect').change(function() {
                var eventID = $(this).val();
                if (eventID) {
                    loadCategories(eventID);
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
    });

    // ---------------END FOR ADD JUDGE TO CATEGORY --------------


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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error loading events.',
                        icon: 'error'
                    });
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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error loading categories.',
                        icon: 'error'
                    });
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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error loading judges.',
                        icon: 'error'
                    });
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
                    // Log the response to check its structure
                    console.log("Criteria response:", data);
        
                    // Ensure data.criteria is an array
                    var criteria = Array.isArray(data.criteria) ? data.criteria : [];
        
                    // Check and log criteria to ensure it's an array
                    if (Array.isArray(criteria)) {
                        console.log("Criteria array:", criteria);
                    } else {
                        console.error('Criteria is not an array:', criteria);
                    }
        
                    if (criteria.length > 0) {
                        var thead = '<tr><th>Contestant Name</th>';
                        var criteriaHeaders = criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th></tr>';
                        $('#contestantTable thead').html(thead);
        
                        // Update category name
                        $('#categoryName').text(data.categoryName || 'Category');
        
                        // Fetch scores after criteria are loaded
                        fetchScoresByJudge(judgeID, criteria);
                    } else {
                        console.error('No criteria found or invalid criteria format:', data);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error loading criteria:', status, error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error loading criteria.',
                        icon: 'error'
                    });
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
                    console.log("Fetched scores from database:", data); // Log fetched scores from database
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
    
                            // Ensure originalScores is populated correctly
                            if (!originalScores[score.contestantID]) {
                                originalScores[score.contestantID] = {};
                            }
                            originalScores[score.contestantID][score.criteriaName] = score.score;
                        });
    
                        console.log("Original scores after processing:", originalScores); // Log the scores after processing
    
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
                                            '" value="' + score + '" style="width: 60px" step="0.01"></td>';
                            });
    
                             // Calculate total score as a decimal
                            var totalScore = Object.values(contestant.scores).reduce(function(sum, score) {
                                return sum + parseFloat(score || 0);  
                            }, 0).toFixed(2); 

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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error fetching scores.',
                        icon: 'error'
                    });
                }
            });
        }
    
        function updateScores() {
            var updatedScores = [];
            var hasChanges = false;
            var judgeID = $('#judgeUpdateSelect').val();
            console.log(judgeID);
    
            $('.score-input').each(function() {
                var contestantID = $(this).data('contestant-id');
                var criterionName = $(this).data('criterion-name');
                var newScore = parseFloat($(this).val());
                var originalScore = originalScores[contestantID] ? originalScores[contestantID][criterionName] : null;
    
                if (newScore !== originalScore) {
                    hasChanges = true;
                    var contestantScore = updatedScores.find(score => score.contestantID === contestantID);
                    if (!contestantScore) {
                        contestantScore = {
                            contestantID: contestantID,
                            scores: {}
                        };
                        updatedScores.push(contestantScore);
                    }
                    contestantScore.scores[$(this).data('criterion-id')] = newScore;
                }
            });
    
            if (!hasChanges) {
                Swal.fire({
                    title: 'No Changes!',
                    text: 'There are no changes to update.',
                    icon: 'info'
                });
                return;
            }
    
            console.log("Scores data being sent:", updatedScores);
    
            $.ajax({
                url: './backend/updateScores.php',
                method: 'POST',
                data: {
                    scores: JSON.stringify(updatedScores),
                    judgeID: judgeID
                },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.message,
                            icon: 'success'
                        }).then(function() {
                            fetchScoresByJudge($('#judgeUpdateSelect').val(), $('#categoryUpdateSelect').val());
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.message,
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
        }
    
        $('#eventUpdateSelect').change(function() {
            var eventID = $(this).val();
            loadCategories(eventID);
        });
    
        $('#categoryUpdateSelect').change(function() {
            var categoryID = $(this).val();
            loadJudges(categoryID);
        });
    
        $('#judgeUpdateSelect').change(function() {
            var judgeID = $(this).val();
            loadCriteria(judgeID, $('#categoryUpdateSelect').val());
        });
    
        $('.updateScoresButton').click(function(event) {
            event.preventDefault(); // Prevent default form submission
            updateScores();
        });
    
    
        // Initialize event loading
        loadEvents();
    });
    

    // --------------- END FOR ADMIN UPDATE JUDGE SCORE TABLE --------------
    

    // --------------- FETCH SCORES FOR OVERALL.HTML SCORE TABLE --------------
    $(document).ready(function() {
         // Initial load of events
         loadEvents();
        // Function to load events
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
                    Swal.fire('Error', 'Error loading events.', 'error');
                }
            });
        }
    
        // Function to fetch scores based on event and category
            function fetchScores(eventID, categoryID) {
            $.ajax({
                url: './backend/getOverallScores.php',
                type: 'POST',
                data: { eventID: eventID, categoryID: categoryID },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        if (categoryID) {
                            // Display scores for a specific category
                            displayCategoryScores(response);
                        } else {
                            // Display overall scores and category summaries
                            displayOverallScores(response);
                        }
                    } else {
                        Swal.fire('Error', response.message, 'error');
                    }
                },
                error: function(error) {
                    console.error('Error fetching scores:', error);
                    Swal.fire('Error', 'Error fetching scores.', 'error');
                }
            });
        }
    
         // Function to display overall scores and category summaries
        function displayOverallScores(response) {
            var scoresSection = $('#scoresSection');
            scoresSection.empty();

            var overallSummarySection = `
                <h1 class="text-white text-center mt-5">Overall Event Summary</h1>
               <div class="row my-5">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="topSelect" class="text-white">Select Top:</label>
                            <select id="topSelect" class="form-control">
                                <option value="20" selected>--- Select Top ---</option>
                                <option value="5">Top 5</option>
                                <option value="10">Top 10</option>
                                <option value="15">Top 15</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="genderSelect" class="text-white">Select Gender:</label>
                            <select id="genderSelect" class="form-control">
                                <option value="all" selected>All</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <table id="overallSummaryTable" class="table table-striped table-hover">
                    <thead>
                        <tr class="text-center">
                            <th colspan="3">Overall Event Summary</th>
                        </tr>
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
            `;
            scoresSection.append(overallSummarySection);

            // Process and display overall summary scores
            calculateOverallSummary(response.scores);
            // Display the contestant scores per judge and total scores below the overall summary table
            displayContestantScoresTable(response.scores);
            

            $('#topSelect').change(function() {
                var topCount = parseInt($(this).val());
                var genderFilter = $('#genderSelect').val(); 
                displayTopContestants(topCount, response.scores, genderFilter);
            });

            $('#genderSelect').change(function() {
                var topCount = parseInt($('#topSelect').val());
                var genderFilter = $(this).val();
                displayTopContestants(topCount, response.scores, genderFilter);
            });

            var categories = response.categories;
            categories.forEach(function(category) {
                var categorySummarySection = `
                    <h1 class="text-white text-center mt-5">Overall Summary for ${category.categoryName}</h1>
                    <table id="categorySummaryTable_${category.categoryID}" class="table table-striped table-hover">
                        <thead>
                           <tr class="text-center">
                                <th colspan="3">Overall Summary for ${category.categoryName}</th> <!-- Use colspan to center the title -->
                            </tr>
                            <tr>
                                <th>Contestant</th>
                                <th>Total Score</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Category summary rows will be populated dynamically -->
                        </tbody>
                    </table>
                `;
                scoresSection.append(categorySummarySection);
    
                var categoryScores = response.scores.filter(score => score.categoryID === category.categoryID);
                calculateCategorySummary(categoryScores, `#categorySummaryTable_${category.categoryID}`);
            });
    
            calculateOverallSummary(response.scores);
        }

        // Function to display contestant scores per judge and total scores
        function displayContestantScoresTable(scores) {
            var scoresSection = $('#scoresSection');
            var contestantScoresTableSection = `
                <h1 class="text-white text-center mt-5">Contestant Scores Per Judge</h1>
                <table id="contestantScoresTable" class="table table-striped table-hover">
                    <thead>
                        <!-- New Row for "Contestant Scores Per Judge" Text -->
                        <tr>
                            <th colspan="100%" class="text-center">Contestant Scores Per Judge</th>
                        </tr>
                        <tr>
                            <th>Contestant</th>
                            <!-- Judge columns will be added dynamically -->
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Contestant score rows will be populated dynamically -->
                    </tbody>
                </table>
            `;
            scoresSection.append(contestantScoresTableSection);
        
            // Organize scores by contestant and judge
            var contestantsScores = {};
            var judges = new Set();
        
            // Loop through scores to organize by contestant and judge
            scores.forEach(score => {
                var contestantName = score.contestantName; // Unique name per contestant
                if (!contestantsScores[contestantName]) {
                    contestantsScores[contestantName] = {
                        contestantNo: score.contestantNo,
                        totalScore: 0
                    };
                }
        
                // Ensure each judge's score is stored separately
                if (!contestantsScores[contestantName][score.judgeName]) {
                    contestantsScores[contestantName][score.judgeName] = 0; // Initialize if not yet added
                }
        
                // Add the score to the individual judge for this contestant
                contestantsScores[contestantName][score.judgeName] += parseFloat(score.score);
        
                // Add the score to the total for this contestant
                contestantsScores[contestantName].totalScore += parseFloat(score.score);
        
                // Keep track of all unique judges
                judges.add(score.judgeName);
            });
        
            var contestantScoresTableBody = $('#contestantScoresTable tbody');
            contestantScoresTableBody.empty();
        
            // Add judge columns to the table header dynamically, but do not include the total score yet
            judges.forEach(judge => {
                $('#contestantScoresTable thead tr:nth-child(2)').append(`<th>${judge}</th>`);
            });
        
            // Add the Total Score column last
            $('#contestantScoresTable thead tr:nth-child(2)').append('<th>Total Score</th>');
        
            // Populate the rows for each contestant
            Object.keys(contestantsScores).forEach(contestantName => {
                var contestantData = contestantsScores[contestantName];
                var row = `<tr><td>${contestantData.contestantNo} - ${contestantName}</td>`;
        
                // Add each judge's score for the contestant
                judges.forEach(judge => {
                    // If a score is missing for a judge, set it to 0
                    row += `<td>${contestantData[judge] || 0}</td>`;
                });
        
                // Add the total score for the contestant at the end
                row += `<td>${contestantData.totalScore.toFixed(2)}</td></tr>`;
                contestantScoresTableBody.append(row);
            });
        
            // Log the total scores for each judge across all categories and contestants
            console.log("Judge Total Scores:");
            judges.forEach(judge => {
                let totalScoreForJudge = 0;
                Object.keys(contestantsScores).forEach(contestantName => {
                    let contestantData = contestantsScores[contestantName];
                    totalScoreForJudge += parseFloat(contestantData[judge] || 0);
                });
                console.log(`${judge}: ${totalScoreForJudge.toFixed(2)}`);
            });
        }
        
        
        
        



        // Function to display the top contestants based on selected count and gender
        function displayTopContestants(topCount, scores, genderFilter) {
            var overallScores = {};
            scores.forEach(score => {
                if (genderFilter === "all" || score.gender === genderFilter) {
                    if (!overallScores[score.contestantName]) {
                        overallScores[score.contestantName] = 0;
                    }
                    overallScores[score.contestantName] += parseFloat(score.score);
                }
            });

            var sortedContestants = Object.keys(overallScores).sort((a, b) => overallScores[b] - overallScores[a]);
            var ranks = {};
            sortedContestants.forEach((contestantName, index) => {
                ranks[contestantName] = index + 1;
            });

            var overallSummaryTableBody = $('#overallSummaryTable tbody');
            overallSummaryTableBody.empty();

            // Limit the display to the top contestants based on the selected value
            sortedContestants.slice(0, topCount).forEach(contestantName => {
                var contestantNo = scores.find(score => score.contestantName === contestantName).contestantNo;
                var totalScore = overallScores[contestantName];
                var rank = ranks[contestantName];
                overallSummaryTableBody.append(`<tr><td>${contestantNo} - ${contestantName}</td><td>${totalScore.toFixed(2)}</td><td>${rank}</td></tr>`);
            });
        }

    
        // Function to display category scores and judge scores
        function displayCategoryScores(response) {
            var scoresSection = $('#scoresSection');
            scoresSection.empty();
    
            var categoryName = response.selectedCategoryName || 'Unknown Category'; // Use selectedCategoryName from response
            var categorySummarySection = `
                <h1 class="text-white text-center mt-5">Overall Summary for ${categoryName}</h1>
                <table id="categorySummaryTable" class="table table-striped table-hover">
                    
                    <thead>
                    <tr class="text-center">
                        <th colspan="3">Overall Summary for ${categoryName}</th> <!-- Use colspan to center the title -->
                    </tr>
                        <tr>
                            <th>Contestant</th>
                            <th>Total Score</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Category summary rows will be populated dynamically -->
                    </tbody>
                </table>
              

            `;
            scoresSection.append(categorySummarySection);
    
            // Process and display category summary
            calculateCategorySummary(response.scores, '#categorySummaryTable');
    
            // Prepare and display judges scores if available
            var judgesScoresTables = $('<div id="judgesScoresTables"></div>');
            var scores = response.scores;
    
            if (scores.length > 0) {
                var judgesScores = {};
    
                // Organize scores by judge
                scores.forEach(score => {
                    if (!judgesScores[score.judgeName]) {
                        judgesScores[score.judgeName] = {};
                    }
                    if (!judgesScores[score.judgeName][score.contestantName]) {
                        judgesScores[score.judgeName][score.contestantName] = {};
                    }
                    judgesScores[score.judgeName][score.contestantName][score.criteriaName] = score.score;
                });
    
                // Iterate over each judge
                Object.keys(judgesScores).forEach(judgeName => {
                    var judgeScores = judgesScores[judgeName];
                    var judgeTable = `<h4 class="text-white fw-bold mt-5">JUDGE: ${judgeName} </h4>`;
                    judgeTable += '<table class="table table-striped table-hover">';
                    judgeTable += `
                    <thead>
                        <tr class="text-center">
                            <th></th>
                            <th colspan="4">JUDGE: ${judgeName} | Signature: ___________</th>
                            <th></th>
                            <th></th>
                        </tr>
                       
                     `;
                    judgeTable += '<tr><th>Contestant</th>';
      
      
    
                    // Add criteria headers
                    var criteriaHeaders = new Set();
                    scores.forEach(score => criteriaHeaders.add(score.criteriaName));
                    criteriaHeaders.forEach(criterion => {
                        judgeTable += `<th>${criterion}</th>`;
                    });
                    judgeTable += '<th>Total Score</th><th>Rank</th></tr></thead><tbody>';
    
                    // Calculate and add scores for each contestant
                    var totalScores = {};
                    Object.keys(judgeScores).forEach(contestantName => {
                        var criteriaScores = judgeScores[contestantName];
                        var totalScore = 0;
    
                        criteriaHeaders.forEach(criterion => {
                            totalScore += parseFloat(criteriaScores[criterion] || 0);
                        });
    
                        totalScores[contestantName] = totalScore;
                    });
    
                    var sortedContestants = Object.keys(totalScores).sort((a, b) => totalScores[b] - totalScores[a]);
                    var ranks = {};
    
                    sortedContestants.forEach((contestantName, index) => {
                        ranks[contestantName] = index + 1;
                    });
    
                    Object.keys(judgeScores).forEach(contestantName => {
                        var contestantNo = scores.find(score => score.contestantName === contestantName).contestantNo;
                        var criteriaScores = judgeScores[contestantName];
                        var totalScore = totalScores[contestantName];
                        var rank = ranks[contestantName];
    
                        judgeTable += `<tr><td>${contestantNo} -  ${contestantName}</td>`;
                        criteriaHeaders.forEach(criterion => {
                            judgeTable += `<td>${criteriaScores[criterion] || 0}</td>`;
                        });
                        judgeTable += `<td>${totalScore.toFixed(2)}</td><td>${rank}</td></tr>`;
                    });
    
                    judgeTable += '</tbody></table>';
                    judgesScoresTables.append(judgeTable);
                });
            }
    
            scoresSection.append(judgesScoresTables);
        }
    
        // Function to calculate and display the overall summary
        function calculateOverallSummary(scores) {
            let overallScores = {};
            scores.forEach(score => {
                if (!overallScores[score.contestantName]) {
                    overallScores[score.contestantName] = 0;
                }
                overallScores[score.contestantName] += parseFloat(score.score);
            });
        
            let ranks = calculateRanks(overallScores);
        
            let overallSummaryTableBody = $('#overallSummaryTable tbody');
            overallSummaryTableBody.empty();
        
            Object.keys(overallScores).sort((a, b) => overallScores[b] - overallScores[a]).forEach(contestantName => {
                let contestantNo = scores.find(score => score.contestantName === contestantName).contestantNo;
                let totalScore = overallScores[contestantName];
                let rank = ranks[contestantName];
                overallSummaryTableBody.append(`<tr><td>${contestantNo} - ${contestantName}</td><td>${totalScore.toFixed(2)}</td><td>${rank}</td></tr>`);
            });
        }
        
    
        // Function to calculate and display category summary
        function calculateCategorySummary(scores, tableSelector) {
            let categoryScores = {};
            scores.forEach(score => {
                if (!categoryScores[score.contestantName]) {
                    categoryScores[score.contestantName] = 0;
                }
                categoryScores[score.contestantName] += parseFloat(score.score);
            });
        
            let ranks = calculateRanks(categoryScores);
        
            let categoryTableBody = $(`${tableSelector} tbody`);
            categoryTableBody.empty();
        
            Object.keys(categoryScores).sort((a, b) => categoryScores[b] - categoryScores[a]).forEach(contestantName => {
                let contestantNo = scores.find(score => score.contestantName === contestantName).contestantNo;
                let totalScore = categoryScores[contestantName];
                let rank = ranks[contestantName];
                categoryTableBody.append(`<tr><td>${contestantNo} - ${contestantName}</td><td>${totalScore.toFixed(2)}</td><td>${rank}</td></tr>`);
            });
        }
        
        function calculateRanks(scores) {
            let ranks = {};
            let sortedScores = Object.keys(scores)
                .map(contestantName => ({
                    name: contestantName,
                    score: scores[contestantName]
                }))
                .sort((a, b) => b.score - a.score);
        
            let rank = 1;
            for (let i = 0; i < sortedScores.length; i++) {
                if (i > 0 && sortedScores[i].score < sortedScores[i - 1].score) {
                    rank = i + 1; // Update rank if the score is lower than the previous one
                }
                ranks[sortedScores[i].name] = rank;
            }
        
            return ranks;
        }
        
    
        // Event change listener
        $('#eventSelect').change(function() {
            var eventID = $(this).val();
            $('#categorySelect').html('<option value=" " disabled selected>--- Select Category ---</option>');  // Reset category dropdown
            if (eventID) {
                $.ajax({
                    url: './backend/getCategories.php',
                    type: 'POST',
                    data: { eventID: eventID },
                    dataType: 'json',
                    success: function(data) {
                        var options = '<option value=" " disabled selected>--- Select Category ---</option>';
                        $.each(data, function(index, category) {
                            options += '<option value="' + category.categoryID + '">' + category.categoryName + '</option>';
                        });
                        $('#categorySelect').html(options);
    
                        // Fetch overall scores for the selected event
                        fetchScores(eventID);
                    },
                    error: function() {
                        Swal.fire('Error', 'Error loading categories.', 'error');
                    }
                });
            }
        });
    
        // Category change listener
        $('#categorySelect').change(function() {
            var categoryID = $(this).val();
            var eventID = $('#eventSelect').val();
            if (categoryID && eventID) {
                fetchScores(eventID, categoryID);
            }
        });
    
       
        
        // Hide the button initially
        $("#exportBtn").hide();

        // Function to check selections
        function checkSelections() {
            const eventSelected = $("#eventSelect").val() !== ""; // Check if an event is selected
            const categorySelected = $("#categorySelect").val() !== ""; // Check if a category is selected

            // Show or hide the button based on selections
            if (eventSelected && categorySelected) {
            $("#exportBtn").show(); // Show the button if both are selected
            } else {
            $("#exportBtn").hide(); // Hide the button otherwise
            }
        }

        // Attach change event listeners to the dropdowns
        $("#eventSelect, #categorySelect").change(checkSelections);

       
        
    });
    
    
    


    // --------------- END FETCH SCORES FOR OVERALL.HTML SCORE TABLE --------------






    // --------------- REMOVE JUDGE FROM CATEGORY --------------
    $(document).ready(function() {
        var judgeID = sessionStorage.getItem('judgeID');
        if (judgeID) {

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
                        $('#removeJudgeSelect').html(options);
                    },
                    error: function() {
                        Swal.fire('Error', 'Error loading events.', 'error');
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
                        console.log('Categories:', data); // Log the categories data
                        var options = '<option value="#" disabled selected>--- Select Category ---</option>';
                        $.each(data, function(index, category) {
                            options += '<option value="' + category.categoryID + '">' + category.categoryName + '</option>';
                        });
                        $('#categoryRemoveJudgeSelect').html(options);
                    },
                    error: function() {
                        Swal.fire('Error', 'Error loading categories.', 'error');
                    }
                });
            }

            function loadAssignedJudges(categoryID, categoryName) {
                $.ajax({
                    url: './backend/getAssignedJudges.php',
                    method: 'GET',
                    data: { categoryID: categoryID },
                    dataType: 'json',
                    success: function(data) {
                        var tableHtml = `
                        <div class="d-flex flex-column align-items-center text-center">
                            <h1 class="fst-italic text-center text-white">${categoryName}</h1>
                        </div>
                            <div class="table-responsive mt-4">
                                <table class="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th>Judge Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="assignedJudgesTableBody">
                        `;
            
                        $.each(data, function(index, judge) {
                            tableHtml += `
                                <tr>
                                    <td>${judge.judgeName}</td>
                                    <td><button class="btn btn-outline-danger text-white remove-judge-btn" data-judge-id="${judge.judgeID}">Remove <i class="fa-solid fa-user-minus"></i> </button></td>
                                </tr>
                            `;
                        });
            
                        tableHtml += `
                                    </tbody>
                                </table>
                            </div>
                        `;
            
                        // Insert the generated table HTML into a specific container
                        $('#tableContainer').html(tableHtml);
            
                        // Attach click event to remove buttons
                        $('.remove-judge-btn').click(function() {
                            var judgeID = $(this).data('judge-id');
                            var categoryName = $('#categoryRemoveJudgeSelect option:selected').text();
                            confirmAndRemoveJudge(judgeID, categoryID, categoryName);
                        });
                    },
                    error: function() {
                        Swal.fire('Error', 'Error loading assigned judges.', 'error');
                    }
                });
            }
            

            function confirmAndRemoveJudge(judgeID, categoryID, categoryName) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Do you really want to remove the judge from ${categoryName}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove it!',
                    cancelButtonText: 'No, cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        removeJudgeFromCategory(judgeID, categoryID);
                    }
                });
            }

            function removeJudgeFromCategory(judgeID, categoryID) {
                $.ajax({
                    url: './backend/removeAssignedJudge.php',
                    method: 'POST',
                    data: { judgeID: judgeID, categoryID: categoryID },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status === 'success') {
                            Swal.fire('Success', response.message, 'success');
                            loadAssignedJudges(categoryID);
                        } else {
                            Swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Error', 'Error removing judge.', 'error');
                    }
                });
            }

            loadEvents();

            $('#removeJudgeSelect').change(function() {
                var eventID = $(this).val();
                if (eventID) {
                    loadCategories(eventID);
                }
            });

            $('#categoryRemoveJudgeSelect').change(function() {
                var categoryID = $(this).val();
                var categoryName = $(this).find('option:selected').text();
                if (categoryID) {
                    loadAssignedJudges(categoryID, categoryName);
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
    });
    // ---------------END FOR REMOVE JUDGE FROM CATEGORY --------------



  // --------------- FOR CRUD JUDGE on Accounts.html--------------
  $(document).ready(function() {
    // Function to show the modal and populate it with judge data
    $('body').on('click', '.editJudgeBtn', function() {
        const judgeID = $(this).data('id');
        const judgeName = $(this).data('name');
        const userType = $(this).data('usertype');

        // Populate the modal fields with the data
        $('#editJudgeID').val(judgeID);
        $('#editJudgeName').val(judgeName);
        $('#editUserType').val(userType);

        // Show the Bootstrap modal
        $('#updateJudgeModal').modal('show');
    });

    // Toggle password visibility for edit password field
    $('#toggleEditPassword').on('click', function() {
        const passwordField = $('#editJudgePassword');
        const passwordIcon = $('#editEyeIcon');
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            passwordIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordField.attr('type', 'password');
            passwordIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });

    // Handle form submission for updating judge
    $('#updateJudgeForm').on('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the default way

        const judgeID = $('#editJudgeID').val();
        const judgeName = $('#editJudgeName').val();
        const userType = $('#editUserType').val();
        const judgePassword = $('#editJudgePassword').val();

        const formData = {
            judgeID: judgeID,
            judgeName: judgeName,
            userType: userType,
            judgePassword: judgePassword // Send this even if it's empty
        };

        $.ajax({
            url: './backend/updateJudge.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                if (response.message === "Judge updated successfully") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Judge details updated successfully.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    $('#updateJudgeModal').modal('hide'); // Hide the modal
                    fetchJudges(); // Refresh the table
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while updating the judge.',
                    });
                }
            }
        });
    });

    // Function to delete a judge
    window.deleteJudge = function(judgeID) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: './backend/deleteJudge.php',
                    method: 'POST',
                    data: { judgeID: judgeID },
                    success: function(response) {
                        if (response.status === 'success') {
                            Swal.fire(
                                'Deleted!',
                                'Judge has been deleted.',
                                'success'
                            );
                            fetchJudges(); // Refresh the judges table after deletion
                        } else {
                            Swal.fire(
                                'Error!',
                                response.message,
                                'error'
                            );
                        }
                    },
                    error: function(xhr, status, error) {
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the judge.',
                            'error'
                        );
                    }
                });
            }
        });
    }

    // Fetch and display judges
    function fetchJudges() {
        $.ajax({
            url: './backend/getJudges.php',
            method: 'GET',
            success: function(data) {
                let tableRows = '';
                data.forEach(function(judge) {
                    tableRows += `<tr>
                                    <td>${judge.judgeName}</td>
                                    <td>${judge.userType}</td>
                                    <td>
                                        <button class="btn btn-outline-primary text-white editJudgeBtn" 
                                                data-id="${judge.judgeID}" 
                                                data-name="${judge.judgeName}" 
                                                data-usertype="${judge.userType}">
                                            Edit <i class="fa-regular fa-pen-to-square"></i>
                                        </button>

                                         <button class="btn btn-outline-danger text-white" onclick="deleteJudge(${judge.judgeID})">
                                            Delete <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                  </tr>`;
                });
                $('#judgesTable').html(tableRows);
            }
        });
    }

    fetchJudges();
});

// ---------------END FOR CRUD JUDGE on Accounts.html--------------