const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

const projectModel = require("./models").project;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/index", home); // Menampilkan semua project
app.get("/projectnew", projectview); // Menampilkan form untuk tambah project
app.post("/projectnew", projectadd); // Menambahkan project
app.get("/project/delete/:id", deleteProject); // Menghapus project
app.get("/project/edit/:id", editProjectView); // Menampilkan form edit project
app.post("/project/edit/:id", editProject); // Mengedit project
app.get("/project-detail/:id", projectDetail); // Menampilkan detail project

app.get("/contactnew", contactview);
app.get("/testimonialnew", testimonialview);

// PROYEK
async function home(req, res, next) {
  projectModel
    .findAll()
    .then((projects) => {
      const formattedProjects = projects.map((project) => {
        const startDate = new Date(project.start_date);
        const endDate = new Date(project.end_date);

        return {
          ...project.toJSON(),
          start_date: `${startDate.getDate()}/${
            startDate.getMonth() + 1
          }/${startDate.getFullYear()}`,
          end_date: `${endDate.getDate()}/${
            endDate.getMonth() + 1
          }/${endDate.getFullYear()}`,
          duration: `${project.duration} months`,
        };
      });
      res.render("index", { projects: formattedProjects });
    })
    .catch((error) => {
      console.error("Error fetching projects from database:", error);
      next(error);
    });
}

function contactview(req, res) {
  res.render("contactnew");
}

function projectview(req, res) {
  res.render("projectnew");
}

async function projectadd(req, res, next) {
  const { title, desc, startdate, enddate, img } = req.body;

  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const durationInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const project = {
    name: title,
    start_date: startdate,
    end_date: enddate,
    duration: durationInMonths,
    description: desc,
    image: img,
  };

  projectModel
    .create(project)
    .then(() => {
      res.redirect("/index");
    })
    .catch((error) => {
      console.error("Error adding project:", error);
      next(error);
    });
}

function deleteProject(req, res, next) {
  const { id } = req.params;

  projectModel
    .findOne({ where: { id } })
    .then((project) => {
      if (!project) {
        return res.status(404).render("not-found");
      }
      return projectModel.destroy({ where: { id } });
    })
    .then(() => {
      res.redirect("/index");
    })
    .catch((error) => {
      console.error("Error deleting project:", error);
      next(error);
    });
}

function editProjectView(req, res, next) {
  const { id } = req.params;

  projectModel
    .findOne({ where: { id } })
    .then((project) => {
      if (!project) {
        return res.status(404).render("not-found");
      }
      res.render("edit-project", { project });
    })
    .catch((error) => {
      console.error("Error fetching project for editing:", error);
      next(error);
    });
}

async function editProject(req, res, next) {
  const { id } = req.params;
  const { title, desc, startdate, enddate, img } = req.body;

  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const durationInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  projectModel
    .findOne({ where: { id } })
    .then((project) => {
      if (!project) {
        return res.status(404).render("not-found");
      }

      project.name = title;
      project.start_date = startdate;
      project.end_date = enddate;
      project.duration = durationInMonths;
      project.description = desc;
      project.image = img;

      return project.save();
    })
    .then(() => {
      res.redirect("/index");
    })
    .catch((error) => {
      console.error("Error updating project:", error);
      next(error);
    });
}

function projectDetail(req, res, next) {
  const { id } = req.params;

  projectModel
    .findOne({ where: { id } })
    .then((project) => {
      if (!project) {
        return res.status(404).render("not-found");
      }
      const startDate = new Date(project.start_date);
      const endDate = new Date(project.end_date);

      const formattedProject = {
        ...project.toJSON(),
        start_date: `${startDate.getDate()}/${
          startDate.getMonth() + 1
        }/${startDate.getFullYear()}`,
        end_date: `${endDate.getDate()}/${
          endDate.getMonth() + 1
        }/${endDate.getFullYear()}`,
        duration: `${project.duration} months`,
      };

      res.render("project-detail", { project: formattedProject });
    })
    .catch((error) => {
      console.error("Error fetching project details:", error);
      next(error);
    });
}

function testimonialview(req, res) {
  res.render("testimonialnew");
}

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
