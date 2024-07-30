
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

        function showLoadingIndicator() {
            $('#loadingIndicator').show();
        }

        function hideLoadingIndicator() {
            $('#loadingIndicator').hide();
        }

        function loadEvents() {
            showLoadingIndicator(); // Show loading indicator

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
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        function loadCategories(eventID) {
            showLoadingIndicator(); // Show loading indicator

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
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        function loadJudges(categoryID) {
            showLoadingIndicator(); // Show loading indicator

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
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        function loadCriteria(judgeID, categoryID) {
            showLoadingIndicator(); // Show loading indicator

            $.ajax({
                url: './backend/adminGetCriteriaByJudge.php',
                method: 'GET',
                data: { judgeID: judgeID, categoryID: categoryID },
                dataType: 'json',
                success: function(data) {
                    console.log("Criteria response:", data);

                    var criteria = Array.isArray(data.criteria) ? data.criteria : [];

                    if (criteria.length > 0) {
                        var thead = '<tr><th>Contestant Name</th>';
                        var criteriaHeaders = criteria.map(function(criterion) {
                            return '<th>' + criterion.criteriaName + '</th>';
                        });
                        thead += criteriaHeaders.join('') + '<th>Total Score</th></tr>';
                        $('#contestantTable thead').html(thead);

                        $('#categoryName').text(data.categoryName || 'Category');

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
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        function fetchScoresByJudge(judgeID, criteria) {
            showLoadingIndicator(); // Show loading indicator

            $.ajax({
                url: './backend/getScoresByJudge.php',
                method: 'GET',
                data: { judgeID: judgeID, categoryID: $('#categoryUpdateSelect').val() },
                dataType: 'json',
                success: function(data) {
                    console.log("Fetched scores from database:", data);
                    if (data.scores && Array.isArray(data.scores)) {
                        originalScores = {}; // Reset original scores
                        var tbody = '';
                        var contestantScores = {};

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

                            if (!originalScores[score.contestantID]) {
                                originalScores[score.contestantID] = {};
                            }
                            originalScores[score.contestantID][score.criteriaName] = score.score;
                        });

                        Object.values(contestantScores).forEach(function(contestant) {
                            var rowHtml = '<tr data-contestant-id="' + contestant.idContestant + '">';
                            rowHtml += '<td>' + contestant.name + '</td>';

                            criteria.forEach(function(criterion) {
                                var score = contestant.scores[criterion.criteriaName] || 0;
                                rowHtml += '<td><input type="number" class="score-input" data-contestant-id="' + contestant.idContestant +
                                            '" data-criterion-name="' + criterion.criteriaName +
                                            '" data-criterion-id="' + criterion.criteriaID + 
                                            '" value="' + score + '" style="width: 60px"></td>';
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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error fetching scores.',
                        icon: 'error'
                    });
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        function updateScores() {
            var updatedScores = [];
            var hasChanges = false;

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

            showLoadingIndicator(); // Show loading indicator

            $.ajax({
                url: './backend/updateScores.php',
                method: 'POST',
                data: { scores: JSON.stringify(updatedScores) },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.message || 'Scores updated successfully.',
                            icon: 'success'
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.message || 'Failed to update scores.',
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
                },
                complete: function() {
                    hideLoadingIndicator(); // Hide loading indicator
                }
            });
        }

        $('#updateScoresButton').on('click', updateScores);

        // Event handlers for dropdowns
        $('#eventUpdateSelect').on('change', function() {
            var eventID = $(this).val();
            if (eventID) {
                loadCategories(eventID);
            }
        });

        $('#categoryUpdateSelect').on('change', function() {
            var categoryID = $(this).val();
            if (categoryID) {
                loadJudges(categoryID);
            }
        });

        $('#judgeUpdateSelect').on('change', function() {
            var judgeID = $(this).val();
            var categoryID = $('#categoryUpdateSelect').val();
            if (judgeID && categoryID) {
                loadCriteria(judgeID, categoryID);
            }
        });

        loadEvents(); // Initialize events on page load
    });

    

    // --------------- END FOR ADMIN UPDATE JUDGE SCORE TABLE --------------
    


    // --------------- FETCH SCORES FOR OVERALL.HTML SCORE TABLE --------------

    $(document).ready(function () {

        // Load events into the dropdown menu
        function loadEvents() {
            $.ajax({
                url: './backend/getEvents.php',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var options = '<option value="#" disabled selected>--- Select Event ---</option>';
                    $.each(data, function (index, event) {
                        options += '<option value="' + event.eventID + '">' + event.eventName + '</option>';
                    });
                    $('#eventSelect').html(options);
                },
                error: function () {
                    Swal.fire('Error', 'Error loading events.', 'error');
                }
            });
        }

        // Fetch scores for the selected event
        function fetchScores(eventID) {
            // Show the loading indicator
            $('#loadingIndicator').show();
            
            $.ajax({
                url: './backend/getOverallScores.php',
                type: 'POST',
                data: { eventID: eventID },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        console.log('Scores Response:', response);  // Log the response for debugging
                        displayCategorySummaries(response.categories, response.scores);
                    } else {
                        Swal.fire('Error', response.message, 'error');
                    }
                },
                error: function (error) {
                    console.error('Error fetching scores:', error);
                    Swal.fire('Error', 'Error fetching scores.', 'error');
                },
                complete: function () {
                    // Hide the loading indicator
                    $('#loadingIndicator').hide();
                }
            });
        }

        // Display category summaries and overall summary
        function displayCategorySummaries(categories, scores) {
            var scoresSection = $('#scoresSection');
            scoresSection.empty();

            var overallSummary = {};

            // Display overall summary first
            var overallSummarySection = `
                <h1 class="text-white text-center mt-5">Overall Event Summary</h1>
                <table id="overallSummaryTable" class="table table-striped table-dark">
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
            `;
            scoresSection.append(overallSummarySection);

            // Aggregate overall scores
            categories.forEach(function (category) {
                // Filter scores by category
                var categoryScores = scores.filter(score => score.categoryName === category.categoryName);

                // Calculate and display category summary
                calculateCategorySummary(categoryScores, `#categorySummaryTable_${category.categoryID}`);

                // Aggregate overall scores
                categoryScores.forEach(score => {
                    if (!overallSummary[score.contestantName]) {
                        overallSummary[score.contestantName] = 0;
                    }
                    overallSummary[score.contestantName] += parseFloat(score.score) || 0; // Ensure score is a number
                });
            });

            // Log overall summary before calculating
            console.log('Overall Summary:', overallSummary);

            // Calculate and display overall summary
            calculateOverallSummary(overallSummary);

            // Now display category summaries
            categories.forEach(function (category) {
                var categorySummarySection = `
                    <h1 class="text-white text-center mt-5">Overall Summary for ${category.categoryName}</h1>
                    <table id="categorySummaryTable_${category.categoryID}" class="table table-striped table-dark">
                        <thead>
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
            });
        }

        // Calculate and display category summary
        function calculateCategorySummary(scores, tableId) {
            var summary = {};

            scores.forEach(score => {
                const scoreValue = parseFloat(score.score);
                if (!summary[score.contestantName]) {
                    summary[score.contestantName] = 0;
                }
                summary[score.contestantName] += isNaN(scoreValue) ? 0 : scoreValue;
            });

            var summaryArray = Object.keys(summary).map(contestantName => ({
                contestantName: contestantName,
                totalScore: summary[contestantName]
            }));

            summaryArray.sort((a, b) => b.totalScore - a.totalScore);

            var tableBody = $(tableId + ' tbody');
            tableBody.empty();

            summaryArray.forEach((item, index) => {
                var rank = index + 1;
                var formattedScore = item.totalScore.toFixed(2);
                tableBody.append('<tr><td>' + item.contestantName + '</td><td>' + formattedScore + '</td><td>' + rank + '</td></tr>');
            });
        }

        // Calculate and display overall summary
        function calculateOverallSummary(overallSummary) {
            var summaryArray = Object.keys(overallSummary).map(contestantName => ({
                contestantName: contestantName,
                totalScore: overallSummary[contestantName]
            }));

            summaryArray.sort((a, b) => b.totalScore - a.totalScore);

            var tableBody = $('#overallSummaryTable tbody');
            tableBody.empty();

            summaryArray.forEach((item, index) => {
                var rank = index + 1;
                var formattedScore = item.totalScore.toFixed(2);
                tableBody.append('<tr><td>' + item.contestantName + '</td><td>' + formattedScore + '</td><td>' + rank + '</td></tr>');
            });
        }

        // Initialize the events dropdown
        loadEvents();

        // Event listener for changes in event dropdown
        $('#eventSelect').change(function () {
            var eventID = $(this).val();
            if (eventID) {
                fetchScores(eventID);  // Fetch event scores
            }
        });
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
                                    <td><button class="btn btn-danger remove-judge-btn" data-judge-id="${judge.judgeID}">Remove</button></td>
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