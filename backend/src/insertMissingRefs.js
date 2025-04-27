const mongoose = require("mongoose");
const Assignment = require("./models/assignmentModel");
const Student = require("./models/studentModel");

async function insertMissingRefs() {
  await mongoose.connect(
    "mongodb+srv://ashishkumar:Ashish%406021@cluster0.q1xxe.mongodb.net/StudentTracker?retryWrites=true&w=majority",
  );

  // Upsert assignments (unchanged)
  const assignments = [
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
      title: "Assignment 1",
      courseId: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
      dueDate: new Date(),
      totalPoints: 100,
    },
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f8"),
      title: "Assignment 2",
      courseId: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
      dueDate: new Date(),
      totalPoints: 100,
    },
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f9"),
      title: "Assignment 3",
      courseId: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
      dueDate: new Date(),
      totalPoints: 100,
    },
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fa"),
      title: "Assignment 4",
      courseId: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
      dueDate: new Date(),
      totalPoints: 100,
    },
  ];

  for (const assignment of assignments) {
    await Assignment.updateOne(
      { _id: assignment._id },
      { $set: assignment },
      { upsert: true },
    );
  }

  // Upsert students (attendance and submissions as numbers)
  const students = [
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"),
      name: "Student A",
      email: "studenta@example.com",
      grade: 90, // <-- number, not string
      submissions: 0,
      attendance: 0,
    },
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
      name: "Student B",
      email: "studentb@example.com",
      grade: 85, // <-- number, not string
      submissions: 0,
      attendance: 0,
    },
    {
      _id: new mongoose.Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
      name: "Student C",
      email: "studentc@example.com",
      grade: 80, // <-- number, not string
      submissions: 0,
      attendance: 0,
    },
  ];

  for (const student of students) {
    await Student.updateOne(
      { _id: student._id },
      { $set: student },
      { upsert: true },
    );
  }

  await mongoose.disconnect();
  console.log("Upserted missing assignments and students.");
}

insertMissingRefs().catch(console.error);
