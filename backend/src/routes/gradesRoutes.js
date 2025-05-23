const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController");

router.get("/", gradesController.getGrades);
router.post("/", gradesController.createGrade);
router.get("/:id", gradesController.getGradeById);
router.put("/:id", gradesController.updateGrade);
router.delete("/:id", gradesController.deleteGrade);

module.exports = router;
