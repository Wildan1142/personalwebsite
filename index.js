const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const config = require("./config/config.json");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({ extended: true }));

app.get("/index", home);

app.get("/projectnew", projectview);

app.get("/contactnew", contactview);

app.post("/projectnew", projectadd);

app.get("/testimonialnew", testimonialview);

const projects = [];

function home(req, res) {
  res.render("index", { projects });
}

function contactview(req, res) {
  res.render("contactnew");
}

function projectview(req, res) {
  res.render("projectnew");
}

function projectadd(req, res) {
  const { title, desc, startdate, enddate, img } = req.body;

  // Hitung durasi proyek
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const durationInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // Simpan proyek dalam objek
  const project = {
    name: title,
    startDate: startdate,
    endDate: enddate,
    duration: durationInMonths,
    description: desc,
    imageUrl: img, // Kamu perlu mengubah ini agar bisa handle upload gambar
  };

  // Tambahkan proyek ke array projects
  projects.unshift(project);
  // console.log("isi blog sekarang", projects);
}

app.post("/project/delete/:index", (req, res) => {
  const { index } = req.params;
  projects.splice(index, 1); // Hapus proyek dari array
  res.redirect("/index");
});

function testimonialview(req, res) {
  res.render("testimonialnew");
}

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});

// app.get("/project-detail", (req, res) {
//   res.render("project-detail");
// });
