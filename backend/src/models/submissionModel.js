const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  submissionDate: { type: Date, required: true }, // Ensure this field is required
  status: {
    type: String,
    enum: ["submitted", "graded", "late"],
    required: true,
  },
  grade: { type: Number },
  feedback: { type: String },
});

module.exports = mongoose.model("Submission", submissionSchema);
