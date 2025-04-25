class CoursesController {
  getCourses(req, res) {
    res.send("Get all courses");
  }

  createCourse(req, res) {
    res.send("Create a new course");
  }

  getCourseById(req, res) {
    res.send(`Get course with ID: ${req.params.id}`);
  }

  updateCourse(req, res) {
    res.send(`Update course with ID: ${req.params.id}`);
  }

  deleteCourse(req, res) {
    res.send(`Delete course with ID: ${req.params.id}`);
  }
}

module.exports = CoursesController;
