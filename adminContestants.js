// --------------- FOR ADD CONTESTANT TO CATEGORY --------------
$(document).ready(function() {
    var judgeID = sessionStorage.getItem('judgeID');
    if (judgeID) {
        // Populate event dropdown
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
                    $('#addEventID').html(options);
                },
                error: function() {
                    alertify.error('Error loading events.');
                }
            });
        }

        // Fetch and display categories as checkboxes based on the selected event
        function loadCategories(eventID) {
            $.ajax({
                url: './backend/adminGetCategories.php',
                method: 'GET',
                data: { eventID: eventID },
                dataType: 'json',
                success: function(data) {
                    var filteredCategories = data;

                    // Debugging: Log the filtered categories to console
                    console.log("Filtered Categories:", filteredCategories);

                    // Generate checkboxes for categories
                    var categoryHtml = '';
                    $.each(filteredCategories, function(index, category) {
                        categoryHtml += '<div class="form-check">';
                        categoryHtml += '<input class="form-check-input" type="checkbox" name="categories[]" value="' + 
                        category.categoryID + '" id="category' + category.categoryID + '">';
                        categoryHtml += '<label class="text-white form-check-label" for="category' + 
                        category.categoryID + '">' + category.categoryName + '</label>';
                        categoryHtml += '</div>';
                    });
                    $('#categoryContainer').html(categoryHtml);
                },
                error: function() {
                    alertify.error('Error loading categories.');
                }
            });
        }

        // Call loadEvents on page load
        loadEvents();

        // Event listener for event selection change
        $('#addEventID').change(function() {
            var eventID = $(this).val();
            if (eventID) {
                loadCategories(eventID);
            }
        });

        // Handle form add submission
        $('#contestantForm').off('submit').on('submit', function(e) {
            e.preventDefault();

            var formData = new FormData(this);
            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]); // Debug form data
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

    
    // ---------------END FOR ADD CONTESTANT TO CATEGORY --------------


    
 // ---------------Fetch CONTESTANTS PER CATEGORY August 2-3 update--------------
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
                    $('#contestantEvent').html(options);
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
                    $('#contestantCategory').html(options);
                },
                error: function() {
                    Swal.fire('Error', 'Error loading categories.', 'error');
                }
            });
        }

        function loadContestants(eventID, categoryID, gender) {
            $.ajax({
                url: './backend/fetchContestants.php',
                method: 'POST',
                data: {
                    eventID: eventID,
                    categoryID: categoryID,
                    gender: gender
                },
                success: function(response) {
                    $('#contestantContainer').html(response);
                },
                error: function() {
                    Swal.fire('Error', 'Error fetching contestants.', 'error');
                }
            });
        }

        $('#contestantEvent').on('change', function() {
            var eventID = $(this).val();
            loadCategories(eventID);
            loadContestants(eventID, $('#contestantCategory').val(), $('#genderFilter').val());
        });

        $('#contestantCategory').on('change', function() {
            var eventID = $('#contestantEvent').val();
            var categoryID = $(this).val();
            loadContestants(eventID, categoryID, $('#genderFilter').val());
        });

        $('#genderFilter').on('change', function() {
            var eventID = $('#contestantEvent').val();
            var categoryID = $('#contestantCategory').val();
            var gender = $(this).val();
            loadContestants(eventID, categoryID, gender);
        });

        loadEvents();
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
 // --------------- END Fetch CONTESTANTS PER CATEGORY --------------


  // ---------------UPDATE AND DELETE CONTESTANTS PER CATEGORY --------------
    function updateContestant(contestantID) {
        const formData = new FormData(document.getElementById(`editForm${contestantID}`));
        
        $.ajax({
            url: './backend/updateContestant.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                const result = JSON.parse(response);
                if (result.status === 'success') {
                    Swal.fire('Success', result.message, 'success').then(() => {
                        // Hide the modal
                        $(`#editModal${contestantID}`).modal('hide');
                        
                    });
                } else if (result.status === 'info') {
                    Swal.fire('Info', result.message, 'info');
                } else {
                    Swal.fire('Error', result.message, 'error');
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
            }
        });
    }


function confirmDelete(contestantID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to recover this contestant!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: './backend/deleteContestant.php',
                type: 'POST',
                data: { contestantID: contestantID },
                success: function(response) {
                    const result = JSON.parse(response);
                    if (result.status === 'success') {
                        Swal.fire('Deleted!', result.message, 'success');
                        location.reload(); // Reload the page to reflect changes
                    } else {
                        Swal.fire('Error', result.message, 'error');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX Error: ', status, error);
                }
            });
        }
    });
}
