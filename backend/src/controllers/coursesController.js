const Course = require("../models/courseModel");

class CoursesController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error });
    }
  }

  async createCourse(req, res) {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error });
    }
  }

  async getCourseById(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course", error });
    }
  }

  async updateCourse(req, res) {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
  }

  async deleteCourse(req, res) {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  }
}

module.exports = new CoursesController();
