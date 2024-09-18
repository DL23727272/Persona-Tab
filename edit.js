$(document).ready(function() {
    // Load Events
    function loadEvents() {
        $.ajax({
            url: './backend/getEvents.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                var selectEvent = $('#selectEvent');
                selectEvent.empty();
                selectEvent.append('<option value="#" disabled selected>--- Select Event ---</option>');
                response.forEach(function(event) {
                    selectEvent.append(`<option value="${event.eventID}">${event.eventName}</option>`);
                });
            }
        });
    }

    // Load Categories
    function loadCategories(eventID) {
        $.ajax({
            url: './backend/getCategoryDetails.php',
            method: 'GET',
            data: { eventID: eventID },
            dataType: 'json',
            success: function(response) {
                var selectCategory = $('#selectCategory');
                var categoryDetailsTable = $('#categoryDetailsTable tbody');
                selectCategory.empty(); // Clear previous categories
                selectCategory.append('<option value="#" disabled selected>--- Select Category ---</option>');
                categoryDetailsTable.empty(); // Clear previous category details
                
                response.forEach(function(category) {
                    selectCategory.append(`<option value="${category.categoryID}">${category.categoryName}</option>`);
                    categoryDetailsTable.append(`
                        <tr>
                            <td>${category.categoryName}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info editCategoryBtn" data-id="${category.categoryID}" data-name="${category.categoryName}">
                                    Edit <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger deleteCategoryBtn text-white" data-id="${category.categoryID}">
                                    Delete <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
                $('#categoryDetailsTable').show();
                $('#selectCategory').prop('disabled', false);
            }
        });
    }

    // Load Criteria
    function loadCriteria(categoryID) {
        $.ajax({
            url: './backend/getCriteriaDetails.php',
            method: 'GET',
            data: { categoryID: categoryID },
            dataType: 'json',
            success: function(response) {
                var criteriaDetailsTable = $('#criteriaDetailsTable tbody');
                criteriaDetailsTable.empty();
                
                response.forEach(function(criteria) {
                    criteriaDetailsTable.append(`
                        <tr>
                            <td>${criteria.criteriaName}</td>
                            <td>${criteria.criteriaScore}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info editCriteriaBtn" data-id="${criteria.criteriaID}" data-name="${criteria.criteriaName}" data-score="${criteria.criteriaScore}">
                                    Edit <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger deleteCriteriaBtn text-white" data-id="${criteria.criteriaID}">
                                    Delete <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
                $('#criteriaDetailsTable').show();
            }
        });
    }

    // Event handler for selecting an event
    $('#selectEvent').on('change', function() {
        var eventID = $(this).val();
        $('#selectCategory').empty().append('<option value="#" disabled selected>--- Select Category ---</option>'); // Reset category dropdown
        $('#criteriaDetailsTable tbody').empty(); // Clear previous criteria details
        loadCategories(eventID);
        $('#eventDetailsTable').show();
        loadEventDetails(eventID); // Added to show event details
    });

    // Event handler for selecting a category
    $('#selectCategory').on('change', function() {
        var categoryID = $(this).val();
        loadCriteria(categoryID);
    });

    // Load Event Details
    function loadEventDetails(eventID) {
        $.ajax({
            url: './backend/getEventDetails.php',
            method: 'GET',
            data: { eventID: eventID },
            dataType: 'json',
            success: function(response) {
                var eventDetailsTable = $('#eventDetailsTable tbody');
                eventDetailsTable.empty();
                response.forEach(function(event) {
                    eventDetailsTable.append(`
                        <tr>
                            <td>${event.eventName}</td>
                            <td>${event.eventDescription}</td>
                            <td>${event.eventDate}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info editEventBtn" data-id="${event.eventID}" data-name="${event.eventName}" 
                                 data-description="${event.eventDescription}" data-date="${event.eventDate}" data-image="${event.eventImage}">
                                    Edit <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger deleteEventBtn text-white" data-id="${event.eventID}">
                                    Delete <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
                $('#eventDetailsTable').show();
            }
        });
    }

    // Handle edit event button click
    $(document).on('click', '.editEventBtn', function(event) {
        event.preventDefault();
        var eventID = $(this).data('id');
        var eventName = $(this).data('name');
        var eventDescription = $(this).data('description');
        var eventDate = $(this).data('date');
        var eventImage = $(this).data('image');
        
        $('#eventID').val(eventID); // Make sure this is correctly setting the eventID
        $('#editEventName').val(eventName);
        $('#editEventDescription').val(eventDescription);
        $('#editEventDate').val(eventDate);
        $('#editEventImage').val(''); // Reset image input
        
        var eventEditModal = new bootstrap.Modal(document.getElementById('eventEditModal'));
        eventEditModal.show();
    });

    // Handle edit category button click
    $(document).on('click', '.editCategoryBtn', function(event) {
        event.preventDefault();
        var categoryID = $(this).data('id');
        var categoryName = $(this).data('name');
        
        $('#categoryID').val(categoryID);
        $('#editCategoryName').val(categoryName);
        
        var categoryEditModal = new bootstrap.Modal(document.getElementById('categoryEditModal'));
        categoryEditModal.show();
    });

    // Handle edit criteria button click
    $(document).on('click', '.editCriteriaBtn', function(event) {
        event.preventDefault();
        var criteriaID = $(this).data('id');
        var criteriaName = $(this).data('name');
        var criteriaScore = $(this).data('score');
        
        $('#criteriaID').val(criteriaID);
        $('#editCriteriaName').val(criteriaName);
        $('#editCriteriaScore').val(criteriaScore);
        
        var criteriaEditModal = new bootstrap.Modal(document.getElementById('criteriaEditModal'));
        criteriaEditModal.show();
    });

    // Handle form submission for updating event
    $('#eventEditForm').on('submit', function(event) {
        event.preventDefault();
    
        var formData = new FormData(this);
        
        formData.forEach(function(value, key){
            console.log(key + ': ' + value);
        });
    
        $.ajax({
            url: './backend/updateEvent.php',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType:'json',
            success: function(response) {
                console.log(response);
                if (response.status === 'success') {
                    Swal.fire('Success', 'Event updated successfully!', 'success');
                    loadEvents();
                    $('#eventEditModal').modal('hide');
                } else {
                    Swal.fire('Error', response.message, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Failed to update event.', 'error');
            }
        });
    });

    // Handle form submission for updating category
    $('#categoryEditForm').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: './backend/updateCategory.php',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json', 
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire('Success', 'Category updated successfully!', 'success');
                    var eventID = $('#selectEvent').val();
                    loadCategories(eventID);
                    $('#categoryEditModal').modal('hide');
                } else {
                    Swal.fire('Error', response.message, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Failed to update category.', 'error');
            }
        });
    });

    // Handle form submission for updating criteria
    $('#criteriaEditForm').on('submit', function(event) {
        event.preventDefault();
        
        $.ajax({
            url: './backend/updateCriteria.php',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire('Success', 'Criteria updated successfully!', 'success');
                    var categoryID = $('#selectCategory').val();
                    loadCriteria(categoryID);
                    $('#criteriaEditModal').modal('hide');
                } else {
                    Swal.fire('Error', response.message, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Failed to update criteria.', 'error');
            }
        });
    });

    // Handle delete event button click
    $(document).on('click', '.deleteEventBtn', function(event) {
        event.preventDefault();
        var eventID = $(this).data('id');
        var row = $(this).closest('tr'); // Reference to the row being deleted
        
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the event and all related categories and criteria!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: './backend/deleteEvent.php',
                    method: 'POST',
                    data: { eventID: eventID },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status === 'success') {
                            Swal.fire('Deleted!', 'The event has been deleted.', 'success');
                            row.remove();
                            loadEvents(); // Refresh events list
                        } else {
                            Swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Error', 'Failed to delete event.', 'error');
                    }
                });
            }
        });
    });



     // Handle delete category button click
     $(document).on('click', '.deleteCategoryBtn', function() {
        var categoryID = $(this).data('id');
        console.log('categ ID: ' + categoryID); 
        var row = $(this).closest('tr'); // Reference to the row being deleted
    
        // Show a confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the category and all its associated data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Make an AJAX request to delete the category
                $.ajax({
                    url: './backend/deleteCategory.php',
                    method: 'POST',
                    data: { categoryID: categoryID },
                    dataType: 'json',
                    success: function(response) {
                        console.log('Server response:', response); // Log server response
                        if (response.status === 'success') {
                            Swal.fire('Deleted!', 'The category has been deleted.', 'success');
                            row.remove();
                            loadCategories(); // Reload categories after deletion
                        } else {
                            Swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('AJAX error:', textStatus, errorThrown); // Log AJAX errors
                        Swal.fire('Error', 'Failed to delete the category.', 'error');
                    }
                });
            }
        });
    });



   // Handle delete criteria button click
    $(document).on('click', '.deleteCriteriaBtn', function() {
        var criteriaID = $(this).data('id');
        var row = $(this).closest('tr'); // Reference to the row being deleted

        // Show SweetAlert confirmation dialog
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
                    url: './backend/deleteCriteria.php',
                    method: 'POST',
                    data: { criteriaID: criteriaID },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status === 'success') {
                            // SweetAlert for success
                            Swal.fire(
                                'Deleted!',
                                'The criteria has been deleted.',
                                'success'
                            );
                            row.remove(); // Remove the row from the table on success
                        } else {
                            // SweetAlert for error
                            Swal.fire(
                                'Error!',
                                response.message,
                                'error'
                            );
                        }
                    },
                    error: function() {
                        // SweetAlert for AJAX error
                        Swal.fire(
                            'Error!',
                            'An error occurred while trying to delete the criteria.',
                            'error'
                        );
                    }
                });
            }
        });
    });
    


    // Initial load of events
    loadEvents();
});
