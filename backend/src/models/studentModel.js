const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  attendance: { type: Number, required: true },
  submissions: { type: Number, required: true },
  grade: { type: Number, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to Course model
});

module.exports = mongoose.model("Student", studentSchema);
