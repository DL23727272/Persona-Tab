    alertify.set('notifier', 'position', 'top-right');

     
      //For navbar
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
      //end of function for navbarrr
     
      //form validation
      function Login() {
          var username = document.getElementById("customerName").value;
          var password = document.getElementById("customerPassword").value;
      
          if (username == "" && password == "") {
              alertify.error('Empty fields! Please fill all the fields.');
          } else if (username == "") {
              alertify.error('Fill up the Username field!');
          } else if (password == "") {
              alertify.error('Fill up the Password field!');
          } else {
              // Send form data to loginProcess.php using AJAX
              $.ajax({
                  type: "POST",
                  url: "./backend/loginProcess.php",
                  data: {
                      customerLoginName: username,
                      customerLoginPassword: password
                  },
                  dataType: "json",
                  success: function(response) {
                      // Handle success response
                      if (response.status === 'success') {

                          // if login goods 
                          //alertify.success(response.message + ' <i class="fa fa-spinner fa-spin"></i>');
                          Swal.fire({
                            icon: 'success',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 2000 
                          });
                          

                          var judgeID = response.judgeID;
                          sessionStorage.setItem('judgeID', judgeID);
      
                          var customerNameInput = document.getElementById("customerName").value;
                          var customerName = customerNameInput;
                          sessionStorage.setItem('customerName', customerName); //tangina  40mins para dito
      
                          setTimeout(function() {

                              if (response.type === 'admin') {
                                  window.location.href = 'admin.html'; 
                              } else {
                                  window.location.href = 'home.html'; 
                              }

                          }, 2000);
      
                      } else {
                        //  alertify.error(response.message);// Display error message 
                          Swal.fire({
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500 
                          });
                          
                      }
                  },
                  error: function(xhr, status, error) {
                      console.error(xhr.responseText);
                      alertify.error('Failed to log in!');
                  }
              });
          }
      }

    document.addEventListener("DOMContentLoaded", function() {
        var judgeID = sessionStorage.getItem('judgeID');
        var judgeName = sessionStorage.getItem('customerName');
        
        // Check if customerID is present
        if (judgeID) {
        
          console.log('Judge ID ' + judgeID)
          console.log('Judge Name ' + judgeName);
          document.getElementById("judgeName").innerHTML = judgeName;
           
        } else {
            console.log('Customer ID not found in sessionStorage'); 
        }
    });

    
// --------------- FOR JUDGE SCORE TABLE --------------
$(document).ready(function() {
    // Get judgeID from session storage
    var judgeID = sessionStorage.getItem('judgeID');

    if (judgeID) {
        // Fetch criteria and contestants based on judgeID
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

                    // Fetch and display contestants based on judgeID
                    fetchContestantsByJudge(judgeID, response.criteria);
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
    } else {
        console.error('Judge ID not found in session storage');
    }

    // Fetch contestants by judge
    function fetchContestantsByJudge(judgeID, criteria) {
        $.ajax({
            url: './backend/getContestantsByJudge.php',
            type: 'GET',
            data: { judgeID: judgeID },
            dataType: 'json',
            success: function(response) {
                if (response.contestants && Array.isArray(response.contestants)) {
                    var tbody = '';
                    response.contestants.forEach(function(contestant) {
                        tbody += '<tr data-contestant-id="' + contestant.idContestant + '" data-category-id="' + contestant.categoryID + '">';
                        tbody += '<td>' + contestant.name + '</td>';

                        // Ensure criteria is defined and iterate over it
                        if (Array.isArray(criteria)) {
                            criteria.forEach(function(criterion) {
                                tbody += '<td><input type="number" class="score-input" data-contestant-id="' 
                                + contestant.idContestant + '" data-criterion-id="' + criterion.criteriaID + 
                                '" data-category-id="' + contestant.categoryID + '" /></td>';
                            });
                        }

                        tbody += '<td class="total-score">N/A</td>'; // Placeholder for Total Score
                        tbody += '<td class="contestant-rank">N/A</td>'; // Placeholder for Rank
                        tbody += '</tr>';
                    });
                    $('#contestantTable tbody').html(tbody);

                    // Add event listeners for score input fields
                    $('.score-input').on('input', function() {
                        calculateAndUpdateScoresAndRanks();
                    });
                } else {
                    console.error('Invalid contestants response:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching contestants:', {
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


    // Save scores
    function saveScores() {
        var scoresData = [];
    
        $('#contestantTable tbody tr').each(function() {
            var contestantID = $(this).data('contestant-id');
            var categoryID = $(this).data('category-id'); // Capture categoryID
    
            $(this).find('.score-input').each(function() {
                var score = parseInt($(this).val()) || 0;
                var criterionID = $(this).data('criterion-id');
                var judgeID = sessionStorage.getItem('judgeID'); // Get the judgeID from session storage
    
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
    
        $.ajax({
            url: './backend/saveScores.php',
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
    
    // Attach saveScores to form submission
    $('#scoringForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        saveScores(); // Call saveScores function
    });
});
