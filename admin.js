
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
