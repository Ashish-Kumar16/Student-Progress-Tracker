const Student = require("../models/studentModel");

class StudentsController {
  async getStudents(req, res) {
    try {
      const students = await Student.find().populate("courses");
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error });
    }
  }

  async addStudent(req, res) {
    try {
      const newStudent = new Student(req.body);
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ message: "Error adding student", error });
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id).populate("courses");
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Error fetching student", error });
    }
  }

  async updateStudentById(req, res) {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error });
    }
  }

  async deleteStudentById(req, res) {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error });
    }
  }
}

module.exports = new StudentsController();
