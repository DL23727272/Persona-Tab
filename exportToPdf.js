// Initialize jsPDF
const { jsPDF } = window.jspdf;

function exportToPDF() {
    const element = document.querySelector("#scoresSection");

    if (!element) {
        console.error('Element not found!');
        return;
    }

    const pdf = new jsPDF({
        orientation: 'landscape', // Use 'portrait' or 'landscape' as needed
        unit: 'mm',
        format: 'a4',
    });

    const tables = element.querySelectorAll("table"); // Get all tables within the container
    let promiseArray = [];
    let currentY = 10; // Starting Y position
    const margin = 10; // Margin from top of the page

    console.log("Number of tables:", tables.length);

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
                pdf.addPage(); // Create a new page
                currentY = margin; // Reset Y position for new page
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
        const selectedCategory = document.querySelector("#categorySelect"); // Assuming you have a categorySelect dropdown
        const selectedCategoryName = selectedCategory.options[selectedCategory.selectedIndex].text; // Get the text of the selected category
        
        // Check if the selected category is valid (not the disabled option)
        const isCategorySelected = selectedCategory.value !== "#" && selectedCategory.value !== ""; // Adjust based on your default value
        
        // Use the selected event and category names for the filename
        const fileName = isCategorySelected ? `${selectedEventName}_${selectedCategoryName}_Summary.pdf` : `${selectedEventName}_Summary.pdf`;

        // Save the PDF with the constructed filename
        pdf.save(fileName); // Example: "Best in Sports Attire_CategoryName_Summary.pdf" or "Best in Sports Attire_Summary.pdf"
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}

// Event listener for export button
$('#exportBtn').click(function() {
    exportToPDF();
});
