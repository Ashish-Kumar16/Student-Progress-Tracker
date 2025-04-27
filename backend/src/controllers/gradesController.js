const Grade = require("../models/gradeModel.js");

class GradesController {
  // Get all grades
  async getGrades(req, res) {
    try {
      const grades = await Grade.find()
        .populate("studentId")
        .populate("courseId")
        .populate("assignmentId");
      console.log("Raw grades:", JSON.stringify(grades, null, 2));
      res.status(200).json(grades);
    } catch (error) {
      console.error("Error retrieving grades:", error);
      res.status(500).json({ message: "Error retrieving grades", error });
    }
  }

  // Create a new grade
  async createGrade(req, res) {
    try {
      const newGrade = new Grade(req.body);
      await newGrade.save();
      res.status(201).json(newGrade);
    } catch (error) {
      res.status(500).json({ message: "Error creating grade", error });
    }
  }

  // Get a single grade by ID
  async getGradeById(req, res) {
    try {
      const grade = await Grade.findById(req.params.id)
        .populate("studentId")
        .populate("courseId")
        .populate("assignmentId");
      if (!grade) {
        return res.status(404).json({ message: "Grade not found" });
      }
      res.status(200).json(grade);
    } catch (error) {
      res.status(500).json({ message: "Error fetching grade", error });
    }
  }

  // Update a grade
  async updateGrade(req, res) {
    const { id } = req.params;
    try {
      const updatedGrade = await Grade.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedGrade) {
        return res.status(404).json({ message: "Grade not found" });
      }
      res.status(200).json(updatedGrade);
    } catch (error) {
      res.status(500).json({ message: "Error updating grade", error });
    }
  }

  // Delete a grade
  async deleteGrade(req, res) {
    try {
      const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
      if (!deletedGrade) {
        return res.status(404).json({ message: "Grade not found" });
      }
      res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting grade", error });
    }
  }
}

module.exports = new GradesController();
