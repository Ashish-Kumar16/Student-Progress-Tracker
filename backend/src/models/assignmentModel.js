const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  dueDate: { type: Date, required: true },
  totalPoints: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
