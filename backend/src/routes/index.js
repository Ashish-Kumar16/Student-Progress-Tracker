const express = require("express");
const attendanceRoutes = require("./attendanceRoutes.js");
const coursesRoutes = require("./coursesRoutes.js");
const gradesRoutes = require("./gradesRoutes.js");
const studentsRoutes = require("./studentsRoutes.js");
const assignmentRoutes = require("./assignmentsRoutes.js");
const submissionRoutes = require("./submissionsRoutes.js");

const setupRoutes = (app) => {
  app.use("/api/attendance", attendanceRoutes);
  app.use("/api/courses", coursesRoutes);
  app.use("/api/grades", gradesRoutes);
  app.use("/api/students", studentsRoutes);
  app.use("/api/assignments", assignmentRoutes);
  app.use("/api/submissions", submissionRoutes);
};

module.exports = setupRoutes;
