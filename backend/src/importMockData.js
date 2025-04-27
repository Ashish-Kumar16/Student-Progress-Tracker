const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Load mock data
const {
  mockStudents,
  mockCourses,
  mockAssignments,
  mockSubmissions,
  mockAttendance,
  mockUsers,
  mockGrades,
} = require("./mockData");

// Define models (if not already defined in your backend)
const Student = require("./models/studentModel");
const Course = require("./models/courseModel");
const Assignment = require("./models/assignmentModel");
const Submission = require("./models/submissionModel");
const Attendance = require("./models/attendanceModel");
const User = require("./models/userModel");
const Grade = require("./models/gradeModel");

// Import data function
const importData = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing data
    await Student.deleteMany();
    await Course.deleteMany();
    await Assignment.deleteMany();
    await Submission.deleteMany();
    await Attendance.deleteMany();
    await User.deleteMany();
    await Grade.deleteMany();

    // Insert mock data
    await Course.insertMany(mockCourses); // Insert courses first
    await Student.insertMany(mockStudents); // Then insert students
    console.log("Inserting assignments...", mockAssignments.length);
    await Assignment.insertMany(mockAssignments);
    console.log("Assignments inserted");
    await Submission.insertMany(mockSubmissions); // Insert submissions
    await Attendance.insertMany(mockAttendance); // Insert attendance
    await User.insertMany(mockUsers); // Insert users
    await Grade.insertMany(mockGrades); // Finally, insert grades

    console.log("Mock data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing mock data:", error);
    process.exit(1);
  }
};

// Run the import function
importData();
