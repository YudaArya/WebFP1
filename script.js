var selectedRow = null;
// simpan data Local storage

// let storeData = [];

// inputSubmit.addEventListener("click", () => {
//   storeData.push({
//     id: Date.now(),
//     text: input.value,
//     finish: false,
//   });
// });

// menampilkan alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = "alert alert-${className}";

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// Clear all
function clearFields() {
  document.querySelector("#judul").value = "";
  document.querySelector("#tgl").value = "";
  document.querySelector("#deskripsi").value = "";
}

// tambah data
document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // get form value
  const judul = document.querySelector("#judul").value;
  const tgl = document.querySelector("#tgl").value;
  const deskripsi = document.querySelector("#deskripsi").value;

  // validasi
  if (judul == "" || tgl == "" || deskripsi == "") {
    showAlert("Please fill in all fields", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#todo-list");
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${judul}</td>
          <td>${tgl}</td>
          <td>${deskripsi}</td>
          <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
          
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Todo Added", "bg-success");
    } else {
      selectedRow.children[0].textContent = judul;
      selectedRow.children[1].textContent = tgl;
      selectedRow.children[2].textContent = deskripsi;
      selectedRow = null;
      showAlert("Todo Info Edited", "info");
    }
    clearFields();
  }
});

// edit data
document.querySelector("#todo-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#judul").value = selectedRow.children[0].textContent;
    document.querySelector("#tgl").value = selectedRow.children[1].textContent;
    document.querySelector("#deskripsi").value = selectedRow.children[2].textContent;
  }
});

// hapus data
document.querySelector("#todo-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Todo Data Deleted", "danger");
  }
});
