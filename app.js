const form = document.getElementById("form");
const uniqueData = {};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  // check if name and contact already exist in the table
  if (uniqueData.hasOwnProperty(name) && uniqueData[name] === contact) {
    alert("Name and contact number already exist");
    return;
  }
  // add the data to the table
  const table = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerHTML = name;
  cell2.innerHTML = contact;
  cell3.innerHTML = `<button class="delete">Delete</button>`;
  // add the data to the object to keep track of unique data
  uniqueData[name] = contact;
});

const search = document.getElementById("search");
search.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const table = document.getElementById("table");
  const rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const nameCell = row.getElementsByTagName("td")[0];
    const contactCell = row.getElementsByTagName("td")[1];
    if (
      nameCell.innerHTML.toLowerCase().indexOf(searchTerm) > -1 ||
      contactCell.innerHTML.toLowerCase().indexOf(searchTerm) > -1
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

const table = document.getElementById("table");
table.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    const confirmDelete = confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      const row = e.target.parentNode.parentNode;
      const name = row.getElementsByTagName("td")[0].innerHTML;
      const contact = row.getElementsByTagName("td")[1].innerHTML;
      row.remove();
      // remove the data from the uniqueData object
      delete uniqueData[name];
    }
  }
});

const nameHeader = document.getElementById("name-header");
nameHeader.addEventListener("click", function () {
  const table = document.getElementById("table");
  const rows = Array.from(table.getElementsByTagName("tr")).slice(1);
  rows.sort((a, b) =>
    a
      .getElementsByTagName("td")[0]
      .innerHTML.localeCompare(b.getElementsByTagName("td")[0].innerHTML)
  );
  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
});
