// Export mock data for the application

const { Types } = require("mongoose");

const mockCourses = [
  {
    _id: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"),
    title: "Mathematics 101",
    description: "An introduction to basic mathematical concepts.",
    credits: 3,
    instructor: "Dr. John Doe",
  },
  {
    _id: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    title: "Introduction to Physics",
    description:
      "Fundamentals of physics including motion, energy, and forces.",
    credits: 4,
    instructor: "Dr. Jane Smith",
  },
  {
    _id: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    title: "World History",
    description: "A survey of world history from ancient to modern times.",
    credits: 3,
    instructor: "Prof. Ahmed Khan",
  },
  {
    _id: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    title: "English Literature",
    description: "An analysis of classic and modern English literature.",
    credits: 3,
    instructor: "Dr. Lucy Chen",
  },
];

const mockSubmissions = [
  {
    id: "sub1",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"), // Replace with valid ObjectId
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"), // Replace with valid ObjectId
    submissionDate: new Date("2025-04-30"), // Add submissionDate
    status: "graded",
    grade: 92,
    feedback: "Excellent work! Just a few minor errors in the last section.",
  },
  {
    id: "sub2",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    submissionDate: new Date("2025-04-30"),
    status: "graded",
    grade: 88,
    feedback:
      "Good understanding of the concepts. Work on showing your steps more clearly.",
  },
  {
    id: "sub3",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f8"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f9"),
    submissionDate: new Date("2025-05-05"),
    status: "submitted",
    grade: null,
    feedback: null,
  },
  {
    id: "sub4",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fa"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fb"),
    submissionDate: new Date("2025-05-11"),
    status: "submitted",
    grade: null,
    feedback: null,
  },
  {
    id: "sub5",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fc"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fd"),
    submissionDate: new Date("2025-05-16"),
    status: "late",
    grade: null,
    feedback: null,
  },
];

const mockAttendance = [
  {
    id: "att1",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"), // Replace "s1" with valid ObjectId
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"), // Replace "c1" with valid ObjectId
    date: new Date("2025-04-24"),
    status: "present",
  },
  {
    id: "att2",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    date: new Date("2025-04-24"),
    status: "present",
  },
  {
    id: "att3",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    date: new Date("2025-04-24"),
    status: "present",
  },
  {
    id: "att4",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f8"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    date: new Date("2025-04-24"),
    status: "absent",
  },
  {
    id: "att5",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f9"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    date: new Date("2025-04-24"),
    status: "late",
  },
];

const mockUsers = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@example.com",
    password: "securepassword123", // Add a password
    role: "Admin", // Use a valid enum value
  },
  {
    id: "u2",
    name: "Teacher One",
    email: "teacher1@example.com",
    password: "teacherpassword1", // Add a password
    role: "Instructor", // Use a valid enum value
  },
  {
    id: "u3",
    name: "Teacher Two",
    email: "teacher2@example.com",
    password: "teacherpassword2", // Add a password
    role: "Instructor", // Use a valid enum value
  },
];

const mockGrades = [
  {
    id: "g1",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"), // Replace "s1" with valid ObjectId
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"), // Replace "c1" with valid ObjectId
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"), // Replace "a1" with valid ObjectId
    grade: 92,
    date: new Date("2025-05-01"),
    semester: "Spring 2025", // Add semester
  },
  {
    id: "g2",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f8"),
    grade: 88,
    date: new Date("2025-05-01"),
    semester: "Spring 2025",
  },
  {
    id: "g3",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f9"),
    grade: 95,
    date: new Date("2025-05-04"),
    semester: "Spring 2025",
  },
  {
    id: "g4",
    studentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    assignmentId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3fa"),
    grade: 78,
    date: new Date("2025-05-08"),
    semester: "Spring 2025",
  },
];

const mockStudents = [
  {
    id: "s1",
    name: "John Smith",
    email: "john.smith@example.com",
    attendance: 92,
    submissions: 12,
    grade: 88,
    courses: [
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"), // Reference valid ObjectId
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    ],
  },
  {
    id: "s2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    attendance: 87,
    submissions: 10,
    grade: 92,
    courses: [
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    ],
  },
  {
    id: "s3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    attendance: 95,
    submissions: 11,
    grade: 90,
    courses: [
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
      Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    ],
  },
];

const mockAssignments = [
  {
    id: "a1",
    title: "Algebra Quiz",
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f4"), // Reference valid Course ObjectId
    dueDate: new Date("2025-05-01"),
    totalPoints: 100,
    description:
      "Quiz covering chapters 1-3 on algebraic expressions and equations.",
  },
  {
    id: "a2",
    title: "Physics Lab Report",
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f5"),
    dueDate: new Date("2025-05-07"),
    totalPoints: 50,
    description: "Write a report on the pendulum experiment conducted in lab.",
  },
  {
    id: "a3",
    title: "History Essay",
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f6"),
    dueDate: new Date("2025-05-12"),
    totalPoints: 75,
    description:
      "Write a 1000-word essay on a significant event in the 20th century.",
  },
  {
    id: "a4",
    title: "Literature Analysis",
    courseId: Types.ObjectId("64b7f9e2e4b0f5a1c8d9e3f7"),
    dueDate: new Date("2025-05-15"),
    totalPoints: 60,
    description: "Analyze the themes in the assigned reading from Shakespeare.",
  },
];

module.exports = {
  mockCourses,
  mockSubmissions,
  mockAttendance,
  mockUsers,
  mockGrades,
  mockStudents,
  mockAssignments,
};
