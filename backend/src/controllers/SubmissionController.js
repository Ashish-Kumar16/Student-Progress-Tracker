const Submission = require("../models/submissionModel");

class SubmissionController {
  async getSubmissions(req, res) {
    try {
      const submissions = await Submission.find()
        .populate("studentId")
        .populate("assignmentId");
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching submissions", error });
    }
  }

  async createSubmission(req, res) {
    try {
      const newSubmission = new Submission(req.body);
      await newSubmission.save();
      res.status(201).json(newSubmission);
    } catch (error) {
      res.status(500).json({ message: "Error creating submission", error });
    }
  }

  async getSubmissionById(req, res) {
    try {
      const submission = await Submission.findById(req.params.id)
        .populate("studentId")
        .populate("assignmentId");
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.status(200).json(submission);
    } catch (error) {
      res.status(500).json({ message: "Error fetching submission", error });
    }
  }

  async updateSubmission(req, res) {
    try {
      const updatedSubmission = await Submission.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.status(200).json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: "Error updating submission", error });
    }
  }

  async deleteSubmission(req, res) {
    try {
      const deletedSubmission = await Submission.findByIdAndDelete(
        req.params.id,
      );
      if (!deletedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.status(200).json({ message: "Submission deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting submission", error });
    }
  }
}

module.exports = new SubmissionController();
