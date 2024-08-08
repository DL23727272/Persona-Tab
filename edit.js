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
                                <button type="button" class="btn btn-outline-info editCategoryBtn" data-id="${category.categoryID}" data-name="${category.categoryName}">Edit</button>
                                <button type="button" class="btn btn-outline-danger deleteCategoryBtn text-white" data-id="${category.categoryID}">Delete</button>
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
                                <button type="button" class="btn btn-outline-info editCriteriaBtn" data-id="${criteria.criteriaID}" data-name="${criteria.criteriaName}" data-score="${criteria.criteriaScore}">Edit</button>
                                <button type="button" class="btn btn-outline-danger deleteCriteriaBtn text-white" data-id="${criteria.criteriaID}">Delete</button>
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
                                <button type="button" class="btn btn-outline-info editEventBtn" data-id="${event.eventID}" data-name="${event.eventName}" data-description="${event.eventDescription}" data-date="${event.eventDate}" data-image="${event.eventImage}">Edit</button>
                                <button type="button" class="btn btn-outline-danger deleteEventBtn text-white" data-id="${event.eventID}">Delete</button>
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
            dataType: 'json', // Ensure the response is treated as JSON
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

    // Initial load of events
    loadEvents();
});
