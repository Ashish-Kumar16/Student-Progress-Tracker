const Grade = require("../models/gradeModel.js");

class GradesController {
  async getGrades(req, res) {
    try {
      const grades = await Grade.find();
      res.status(200).json(grades);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving grades", error });
    }
  }

  async updateGrade(req, res) {
    const { id } = req.params;
    const { grade } = req.body;

    try {
      const updatedGrade = await Grade.findByIdAndUpdate(
        id,
        { grade },
        { new: true },
      );
      if (!updatedGrade) {
        return res.status(404).json({ message: "Grade not found" });
      }
      res.status(200).json(updatedGrade);
    } catch (error) {
      res.status(500).json({ message: "Error updating grade", error });
    }
  }
}

module.exports = new GradesController();
