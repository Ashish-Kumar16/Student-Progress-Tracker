const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController"); // Import the instance directly

// Route to get all grades
router.get("/", gradesController.getGrades);

// Route to update a specific grade
router.put("/:id", gradesController.updateGrade);

module.exports = router;
