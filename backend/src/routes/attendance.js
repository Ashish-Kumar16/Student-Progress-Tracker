const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendanceController');

const attendanceController = new AttendanceController();

// Route to get attendance records
router.get('/', attendanceController.getAttendance);

// Route to post new attendance data
router.post('/', attendanceController.postAttendance);

module.exports = router;