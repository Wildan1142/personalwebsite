// Fungsi untuk menambahkan proyek baru ke dalam localStorage
function getwork(event) {
  event.preventDefault();

  const inputprojectname = document.getElementById("project").value;
  const inputstartdate = document.getElementById("start-date").value;
  const inputenddate = document.getElementById("end-date").value;
  const inputdes = document.getElementById("desc").value;
  const inputimage = document.getElementById("img").files;

  if (
    !inputprojectname ||
    !inputstartdate ||
    !inputenddate ||
    !inputdes ||
    !inputimage
  ) {
    // Menampilkan peringatan jika ada field yang kosong
    alert("Please fill out all required fields");
    return;
  }

  alert("Successfully added to Home page");

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  for (let i = 0; i < inputimage.length; i++) {
    const blobimage = URL.createObjectURL(inputimage[i]);

    const startDate = new Date(inputstartdate);
    const endDate = new Date(inputenddate);
    const durationInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const project = {
      name: inputprojectname,
      startDate: inputstartdate,
      endDate: inputenddate,
      duration: durationInMonths,
      description: inputdes,
      imageUrl: blobimage,
    };

    projects.unshift(project);
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjectsFromStorage(); // Update the project list after adding new projects
}

// Fungsi untuk menampilkan daftar proyek di halaman indexnew.html
function renderProjectsFromStorage() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectHTML = projects
    .map(
      (project, index) => `
        <div class="ms-3 mt-3">
          <div class="card border-3" style="width: 400px; height: 450px; max-width: 400px; max-height: 450px">
            <img
              src="${project.imageUrl}"
              class="card-img-top"
              style="width: 100%; height: 200px; object-fit:cover"
              alt="Project Image"
            />
            <div class="card-body">
              <h5 class="card-title text-center">${project.name}</h5>
              <div class="d-flex">
                <p class="card-text">${project.startDate} - ${project.endDate}</p>
                <p class="card-text mx-2">|</p>
                <p class="card-text">Wildan Bagus Pratama</p>
              </div>
              <p class="card-text">${project.description}</p>
              <p class="card-text">Duration: ${project.duration} months</p>
              <a href="#" class="btn btn-primary" onclick="editProject(${index})">Edit</a>
              <a href="#" class="btn btn-primary" onclick="deleteProject(${index})">Delete</a>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  document.getElementById("project-list").innerHTML = projectHTML;
}

// Panggil fungsi renderProjectsFromStorage ketika halaman indexnew.html dimuat
if (window.location.pathname.endsWith("indexnew.html")) {
  window.onload = renderProjectsFromStorage;
}

// Fungsi untuk menghapus proyek dari localStorage
function deleteProject(index) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjectsFromStorage(); // Update the project list after deletion
}
