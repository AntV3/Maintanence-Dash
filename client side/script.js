// this will load the content

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inputForm");
    const results = document.createElement("div");
    results.id = "results";
    document.body.appendChild(results);

    const table = document.createElement("table");
    const header = document.createElement("tr");
    const headers = ["Name", "Timestamp", "Message"];

    headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.innerText = headerText;
        header.appendChild(th);
    });
    table.appendChild(header);
    results.appendChild(table);

    // Load data from localStorage and display it
    loadData();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

       
        displayDataOnDashboard(data);

        // Save data to localStorage
        saveData(data);
    });
});

function displayDataOnDashboard(data) {
    const table = document.querySelector("#results table");


    const row = document.createElement("tr");
    const fields = ["name", "timestampz", "message"];

    fields.forEach((field) => {
        const td = document.createElement("td");
        td.innerText = data[field] || "N/A"; // Display "N/A" if the field is undefined
        row.appendChild(td);
    });

    
    table.insertBefore(row, table.children[1]);
}

function saveData(data) {
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    existingData.push(data);
    localStorage.setItem("formData", JSON.stringify(existingData));
}

function loadData() {
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];

    savedData.forEach((data) => {
        displayDataOnDashboard(data);
    });
}



const clearDataButton = document.getElementById('clearDataButton');

clearDataButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
    fetch('clear-data.php', {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        alert(data);
        location.reload();
      })
      .catch(error => {
        console.error('Error clearing data:', error);
      });
  }
});


