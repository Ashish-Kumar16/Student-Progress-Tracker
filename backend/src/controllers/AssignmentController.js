const Assignment = require("../models/assignmentModel");

class AssignmentController {
  async getAssignments(req, res) {
    try {
      const assignments = await Assignment.find().populate("courseId");
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching assignments", error });
    }
  }

  async createAssignment(req, res) {
    try {
      const newAssignment = new Assignment(req.body);
      await newAssignment.save();
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: "Error creating assignment", error });
    }
  }

  async getAssignmentById(req, res) {
    try {
      const assignment = await Assignment.findById(req.params.id).populate(
        "courseId",
      );
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching assignment", error });
    }
  }

  async updateAssignment(req, res) {
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.status(200).json(updatedAssignment);
    } catch (error) {
      res.status(500).json({ message: "Error updating assignment", error });
    }
  }

  async deleteAssignment(req, res) {
    try {
      const deletedAssignment = await Assignment.findByIdAndDelete(
        req.params.id,
      );
      if (!deletedAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting assignment", error });
    }
  }
}

module.exports = new AssignmentController();
