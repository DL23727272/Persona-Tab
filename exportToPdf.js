// Initialize jsPDF
const { jsPDF } = window.jspdf;

function exportToPDF() {
    const element = document.querySelector("#scoresSection");

    if (!element) {
        console.error('Element not found!');
        return;
    }

    // Show a SweetAlert confirmation before exporting
    Swal.fire({
        title: 'Export PDF?',
        text: "Are you sure you want to export the document as a PDF?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, export it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const pdf = new jsPDF({
                orientation: 'landscape', // 'portrait' or 'landscape' orientation
                unit: 'mm',
                format: 'a4', // A4 paper size
            });

            const tables = element.querySelectorAll("table"); // Get all tables within the container
            let promiseArray = [];
            let currentY = 40; // Starting Y position to account for the header
            const margin = 10; // Margin from the edges of the page

            console.log("Number of tables:", tables.length);

            // Load the logo image and header synchronously before rendering any tables
            const logoUrl = "./img/P.png"; // Path to your logo
            const img = new Image();
            img.src = logoUrl;
            
            img.onload = function() {
                // Function to add header on each page
                function addHeader(isNewPage = false) {
                    if (isNewPage) {
                        pdf.addPage();
                    }

                    // Add logo and header text on every page
                    pdf.addImage(img, 'PNG', margin, 5, 40, 20); // Position (x, y) and size (width, height)
                    pdf.setFontSize(16);
                    pdf.setFont("helvetica", "bold");
                    const headerText = "PersonaTab: Your Personal Tabulation Partner";
                    pdf.text(headerText, margin + 50, 15); // Adjust the position of the text after the logo
                    pdf.setLineWidth(0.5);
                    pdf.line(10, 30, pdf.internal.pageSize.width - 10, 30); // Horizontal line after the header
                }

                // Add header to the first page
                addHeader();

                // Loop through tables
                for (let index = 0; index < tables.length; index++) {
                    // Capture the table as an image
                    promiseArray.push(html2canvas(tables[index], { scale: 2 }).then(canvas => {
                        const imgData = canvas.toDataURL('image/png');

                        // Check the dimensions and adjust the width if needed
                        const imgWidth = pdf.internal.pageSize.width - 20; // 10mm margin on each side
                        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

                        // Check if currentY exceeds page height and add a new page if needed
                        if (currentY + imgHeight + margin > pdf.internal.pageSize.height) {
                            addHeader(true); // Add new page and header
                            currentY = 40; // Reset Y position for new page (after header)
                        }

                        // Add the image of the table to the PDF
                        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
                        currentY += imgHeight + margin; // Update Y position for the next table

                        console.log(`Table ${index + 1} added at Y position: ${currentY}`);
                    }).catch(error => {
                        console.error(`Error capturing table ${index + 1}:`, error);
                    }));
                }

                // Wait for all promises to resolve before saving the PDF
                Promise.all(promiseArray).then(() => {
                    // Get the selected event name from the dropdown
                    const selectedEvent = document.querySelector("#eventSelect");
                    const selectedEventName = selectedEvent.options[selectedEvent.selectedIndex].text; // Get the text of the selected option

                    // Get the selected category name from the dropdown
                    const selectedCategory = document.querySelector("#categorySelect"); 
                    const selectedCategoryName = selectedCategory.options[selectedCategory.selectedIndex].text; // Get the text of the selected category
                    
                    // Check if the selected category is valid (not the disabled option)
                    const isCategorySelected = selectedCategory.value !== "#" && selectedCategory.value !== ""; // Adjust based on your default value
                    
                    // Use the selected event and category names for the filename
                    const fileName = isCategorySelected ? `${selectedEventName}_${selectedCategoryName}_Summary.pdf` : `${selectedEventName}_Summary.pdf`;

                    // Save the PDF with the constructed filename
                    pdf.save(fileName); // Example: "Best in Sports Attire_CategoryName_Summary.pdf" or "Best in Sports Attire_Summary.pdf"

                    // Show success SweetAlert
                    Swal.fire({
                        title: 'Export Successful!',
                        text: `Your PDF has been exported successfully as ${fileName}.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }).catch(error => {
                    console.error('Error generating PDF:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an issue generating the PDF.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            };

            img.onerror = function() {
                console.error('Failed to load the logo image.');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load the logo image.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            };
        }
    });
}

// Event listener for export button
$('#exportBtn').click(function() {
    exportToPDF();
});
