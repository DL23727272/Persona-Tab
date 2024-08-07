$(document).ready(function() {
    // Fetch and display events
    function loadEvents() {
        $.ajax({
            url: './backend/indexFetchEventDesc.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log(response);

                if (response.status === 'success') {
                    var events = response.data;
                    var eventsContainer = $('.eventSection');

                    events.forEach(function(event) {
                        var eventHTML = `
                            <div class="event-card d-flex flex-column align-items-center text-center mb-5" data-event-id="${event.eventID}">
                                <img src="./EventUploads/${event.eventImage}" style="width: 200px; height: 200px;" alt="logo" class="mt-5 mb-3 img-fluid eventImage" />
                                <h1 class="fst-italic heroEventName text-white">${event.eventName}</h1>
                                <h4 class="fst-italic heroEventDate text-white">${event.eventDate}</h4>
                                <p class="w-75 lead text-secondary fst-italic eventDescription">${event.eventDescription}</p>

                                <hr class="container-sm Sborder border-light mt-5 border-2 opacity-50" style="width: 30%;" />

                                <!-- Fetch Contestants -->
                               <!-- Fetch Contestants -->
                                <section class="container-sm">
                                    <h3 class="fst-italic text-center text-white">Check Contestants</h3>
                                    <div class="container mt-5">
                                        <div class="row justify-content-center mb-3">
                                            <div class="col-12 col-md-4 mb-2 mb-md-0 d-flex flex-column ">
                                                <label for="contestantCategory-${event.eventID}" class="form-label text-white text-center">Select Category</label>
                                                <select id="contestantCategory-${event.eventID}" class="form-select ">
                                                    <option value="#" disabled selected>--- Select Category ---</option>
                                                    <!-- Category options will be loaded here -->
                                                </select>
                                            </div>
                                            <div class="col-12 col-md-4 d-flex flex-column align-items-center">
                                                <label for="genderFilter-${event.eventID}" class="form-label text-white text-center">Select Gender</label>
                                                <select id="genderFilter-${event.eventID}" class="form-select ">
                                                    <option value="#">--- Select Gender ---</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="contestantContainer-${event.eventID}" class="row">
                                            <!-- Contestants will be displayed here -->
                                        </div>
                                    </div>
                                </section>


                                <hr class="container-sm Sborder border-success mt-5 border-2 opacity-50"  style="width: 80%;" />
                            </div>
                        `;

                        eventsContainer.append(eventHTML);

                        // Load categories for each event after the event card is appended
                        loadCategories(event.eventID);
                    });

                    // Initialize event handlers
                    initializeEventHandlers();
                } else {
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
            }
        });
    }

    // Initialize event handlers for dynamically loaded content
    function initializeEventHandlers() {
        $('.eventSection').on('change', '.form-select', function() {
            var $eventCard = $(this).closest('.event-card');
            var eventID = $eventCard.data('event-id');
            var categoryID = $eventCard.find(`#contestantCategory-${eventID}`).val();
            var gender = $eventCard.find(`#genderFilter-${eventID}`).val();
            loadContestants(eventID, categoryID, gender);
        });
    }

    // Fetch and display categories
    function loadCategories(eventID) {
        $.ajax({
            url: './backend/adminGetCategories.php',
            method: 'GET',
            data: { eventID: eventID },
            dataType: 'json',
            success: function(data) {
                console.log('Categories:', data);
                var options = '<option value="#" disabled selected>--- Select Category ---</option>';
                $.each(data, function(index, category) {
                    options += '<option value="' + category.categoryID + '">' + category.categoryName + '</option>';
                });
                $(`#contestantCategory-${eventID}`).html(options);
            },
            error: function() {
                Swal.fire('Error', 'Error loading categories.', 'error');
            }
        });
    }

    function loadContestants(eventID, categoryID, gender) {
        $.ajax({
            url: './backend/indexFetchContestants.php',
            method: 'POST',
            data: {
                eventID: eventID,
                categoryID: categoryID,
                gender: gender
            },
            success: function(response) {
                $(`#contestantContainer-${eventID}`).html(response);
            },
            error: function() {
                Swal.fire('Error', 'Error fetching contestants.', 'error');
            }
        });
    }

    // Initialize
    loadEvents();
});
