
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
        e.preventDefault();
        var formData = $(this).serialize();
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
                var options = '';
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
                    // Example: Populate a dropdown with categories
                    let categoryDropdown = $('#criteriaCategory, #judgeCategory');
                    categoryDropdown.empty();
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

          //Call the modal
          $("#modalContainer").load("adminModal.html");
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
     