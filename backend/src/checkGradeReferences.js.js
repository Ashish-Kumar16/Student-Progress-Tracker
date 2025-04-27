const mongoose = require("mongoose");
const Grade = require("./models/gradeModel");
const Assignment = require("./models/assignmentModel");
const Student = require("./models/studentModel");

async function checkReferences() {
  await mongoose.connect(
    "mongodb+srv://ashishkumar:Ashish%406021@cluster0.q1xxe.mongodb.net/StudentTracker?retryWrites=true&w=majority",
  ); // Change to your DB

  const grades = await Grade.find();
  console.log(`Found ${grades.length} grades`);

  for (const grade of grades) {
    console.log(`Checking grade: ${grade._id}`);
    if (grade.assignmentId) {
      const assignmentExists = await Assignment.exists({
        _id: grade.assignmentId,
      });
      if (!assignmentExists) {
        console.log(
          `Missing assignment for grade ${grade._id}: ${grade.assignmentId}`,
        );
      }
    } else {
      console.log(`Grade ${grade._id} has no assignmentId`);
    }
    if (grade.studentId) {
      const studentExists = await Student.exists({ _id: grade.studentId });
      if (!studentExists) {
        console.log(
          `Missing student for grade ${grade._id}: ${grade.studentId}`,
        );
      }
    } else {
      console.log(`Grade ${grade._id} has no studentId`);
    }
  }

  await mongoose.disconnect();
  console.log("Check complete.");
}

checkReferences().catch(console.error);
