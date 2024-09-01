const projects = []; // Array untuk menyimpan proyek

function getwork(event) {
  event.preventDefault();

  // Mengambil nilai dari input dengan ID yang sudah ditentukan
  const inputprojectname = document.getElementById("project").value;
  const inputstartdate = document.getElementById("start-date").value;
  const inputenddate = document.getElementById("end-date").value;
  const inputdes = document.getElementById("desc").value;
  const inputimage = document.getElementById("img").files;

  // Ini digunakan untuk mengakses dan membuat URL sementara untuk setiap file gambar yang diupload oleh pengguna.
  for (let i = 0; i < inputimage.length; i++) {
    const blobimage = URL.createObjectURL(inputimage[i]);

    // Mengubah tanggal menjadi objek Date
    const startDate = new Date(inputstartdate);
    const endDate = new Date(inputenddate);

    // Menghitung perbedaan bulan antara dua tanggal
    const durationInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    // Membuat objek proyek dan menambahkannya ke array projects
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

  // Memanggil fungsi untuk menampilkan proyek yang tersimpan dalam array
  renderProjects();
}

function renderProjects() {
  // Menghasilkan HTML untuk daftar proyek dengan informasi dan tombol aksi
  const projectHTML = projects
    .map(
      (project, index) => `
    <div class="project-list">
      <img src="${
        project.imageUrl
      }" alt="Project Image" class="project-image" />
      <h3>${project.name}</h3>
      <p>Start Date: ${project.startDate}</p>
      <p>End Date: ${project.endDate}</p>
      <p>Duration: ${project.duration} month${
        project.duration > 1 ? "s" : ""
      }</p>
      <p>Description: ${project.description}</p>
            <button class="edit-button" onclick="editProject(${index})">Edit</button>
      <button class="delete-button" onclick="deleteProject(${index})">Delete</button>
    </div>
  `
    )
    .join("");

  // Memasukkan HTML yang dihasilkan ke dalam elemen dengan ID "contents"
  document.getElementById("contents").innerHTML = projectHTML;
}

function deleteProject(index) {
  // Menghapus proyek berdasarkan indeks
  projects.splice(index, 1);
  // Perbarui tampilan setelah penghapusan
  renderProjects();
}
