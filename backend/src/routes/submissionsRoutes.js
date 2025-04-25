const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/SubmissionController");

router.get("/", submissionController.getSubmissions);
router.post("/", submissionController.createSubmission);
router.get("/:id", submissionController.getSubmissionById);
router.put("/:id", submissionController.updateSubmission);
router.delete("/:id", submissionController.deleteSubmission);

module.exports = router;
