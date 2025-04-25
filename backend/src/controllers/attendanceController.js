const Attendance = require("../models/attendanceModel");

class AttendanceController {
  async getAttendance(req, res) {
    try {
      const attendances = await Attendance.find()
        .populate("studentId")
        .populate("courseId");
      res.status(200).json(attendances);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving attendance records.", error });
    }
  }

  async postAttendance(req, res) {
    try {
      const newAttendance = new Attendance(req.body);
      await newAttendance.save();
      res.status(201).json(newAttendance);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error posting attendance data.", error });
    }
  }
}

module.exports = new AttendanceController();
