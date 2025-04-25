const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

router.get("/", coursesController.getCourses);
router.post("/", coursesController.createCourse);
router.get("/:id", coursesController.getCourseById);
router.put("/:id", coursesController.updateCourse);
router.delete("/:id", coursesController.deleteCourse);
module.exports = router;
