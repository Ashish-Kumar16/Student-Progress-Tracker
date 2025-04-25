const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

// Route to get all students
router.get("/", studentsController.getStudents);

// Route to add a new student
router.post("/", studentsController.addStudent);

// Route to get a student by ID
router.get("/:id", studentsController.getStudentById);

// Route to update a student by ID
router.put("/:id", studentsController.updateStudentById);

// Route to delete a student by ID
router.delete("/:id", studentsController.deleteStudentById);

module.exports = router;
