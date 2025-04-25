class StudentsController {
  getStudents(req, res) {
    res.send("Get all students");
  }

  addStudent(req, res) {
    res.send("Add a new student");
  }

  getStudentById(req, res) {
    res.send(`Get student with ID: ${req.params.id}`);
  }

  updateStudentById(req, res) {
    res.send(`Update student with ID: ${req.params.id}`);
  }

  deleteStudentById(req, res) {
    res.send(`Delete student with ID: ${req.params.id}`);
  }
}

module.exports = new StudentsController(); // Export an instance
