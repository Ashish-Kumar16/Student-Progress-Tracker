const express = require("express");
const attendanceRoutes = require("./attendance.js");
const coursesRoutes = require("./courses.js");
const gradesRoutes = require("./grades.js");
const studentsRoutes = require("./students.js");

const router = express.Router();

const setupRoutes = (app) => {
  app.use("/api/attendance", attendanceRoutes);
  app.use("/api/courses", coursesRoutes);
  app.use("/api/grades", gradesRoutes);
  app.use("/api/students", studentsRoutes);
};

module.exports = setupRoutes;
