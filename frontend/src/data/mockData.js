
// Export mock data for the application

export const mockStudents = [
  {
    id: "s1",
    name: "John Smith",
    email: "john.smith@example.com",
    attendance: 92,
    submissions: 12,
    grade: 88,
    courses: ["c1", "c2", "c3"]
  },
  {
    id: "s2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    attendance: 87,
    submissions: 10,
    grade: 92,
    courses: ["c1", "c3"]
  },
  {
    id: "s3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    attendance: 95,
    submissions: 11,
    grade: 90,
    courses: ["c2", "c4"]
  },
  {
    id: "s4",
    name: "Lucy Chen",
    email: "lucy.chen@example.com",
    attendance: 78,
    submissions: 9,
    grade: 84,
    courses: ["c1", "c4"]
  },
  {
    id: "s5",
    name: "David Kim",
    email: "david.kim@example.com",
    attendance: 65,
    submissions: 8,
    grade: 72,
    courses: ["c2", "c3"]
  }
];

export const mockCourses = [
  {
    id: "c1",
    name: "Mathematics 101",
    code: "MATH101",
    enrollmentCount: 32,
    assignmentCount: 8
  },
  {
    id: "c2",
    name: "Introduction to Physics",
    code: "PHYS101",
    enrollmentCount: 28,
    assignmentCount: 7
  },
  {
    id: "c3",
    name: "World History",
    code: "HIST201",
    enrollmentCount: 35,
    assignmentCount: 6
  },
  {
    id: "c4",
    name: "English Literature",
    code: "ENG202",
    enrollmentCount: 24,
    assignmentCount: 9
  }
];

export const mockAssignments = [
  {
    id: "a1",
    title: "Algebra Quiz",
    courseId: "c1",
    dueDate: "2025-05-01",
    totalPoints: 100,
    description: "Quiz covering chapters 1-3 on algebraic expressions and equations."
  },
  {
    id: "a2",
    title: "Physics Lab Report",
    courseId: "c2",
    dueDate: "2025-05-07",
    totalPoints: 50,
    description: "Write a report on the pendulum experiment conducted in lab."
  },
  {
    id: "a3",
    title: "History Essay",
    courseId: "c3",
    dueDate: "2025-05-12",
    totalPoints: 75,
    description: "Write a 1000-word essay on a significant event in the 20th century."
  },
  {
    id: "a4",
    title: "Literature Analysis",
    courseId: "c4",
    dueDate: "2025-05-15",
    totalPoints: 60,
    description: "Analyze the themes in the assigned reading from Shakespeare."
  },
  {
    id: "a5",
    title: "Calculus Homework",
    courseId: "c1",
    dueDate: "2025-05-03",
    totalPoints: 40,
    description: "Complete problems 1-15 on derivatives and integrals."
  }
];

export const mockSubmissions = [
  {
    id: "sub1",
    studentId: "s1",
    assignmentId: "a1",
    submittedDate: "2025-04-30",
    status: "graded",
    grade: 92,
    feedback: "Excellent work! Just a few minor errors in the last section."
  },
  {
    id: "sub2",
    studentId: "s2",
    assignmentId: "a1",
    submittedDate: "2025-04-30",
    status: "graded",
    grade: 88,
    feedback: "Good understanding of the concepts. Work on showing your steps more clearly."
  },
  {
    id: "sub3",
    studentId: "s3",
    assignmentId: "a2",
    submittedDate: "2025-05-05",
    status: "submitted",
    grade: null,
    feedback: null
  },
  {
    id: "sub4",
    studentId: "s4",
    assignmentId: "a3",
    submittedDate: "2025-05-11",
    status: "submitted",
    grade: null,
    feedback: null
  },
  {
    id: "sub5",
    studentId: "s5",
    assignmentId: "a4",
    submittedDate: "2025-05-16",
    status: "late",
    grade: null,
    feedback: null
  }
];

export const mockAttendance = [
  {
    id: "att1",
    studentId: "s1",
    courseId: "c1",
    date: "2025-04-24",
    status: "present"
  },
  {
    id: "att2",
    studentId: "s2",
    courseId: "c1",
    date: "2025-04-24",
    status: "present"
  },
  {
    id: "att3",
    studentId: "s3",
    courseId: "c2",
    date: "2025-04-24",
    status: "present"
  },
  {
    id: "att4",
    studentId: "s4",
    courseId: "c1",
    date: "2025-04-24",
    status: "absent"
  },
  {
    id: "att5",
    studentId: "s5",
    courseId: "c3",
    date: "2025-04-24",
    status: "late"
  }
];

export const mockUsers = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator"
  },
  {
    id: "u2",
    name: "Teacher One",
    email: "teacher1@example.com",
    role: "Teacher"
  },
  {
    id: "u3",
    name: "Teacher Two",
    email: "teacher2@example.com",
    role: "Teacher"
  }
];

export const mockGrades = [
  {
    id: "g1",
    studentId: "s1",
    courseId: "c1",
    assignmentId: "a1",
    grade: 92,
    date: "2025-05-01"
  },
  {
    id: "g2",
    studentId: "s2",
    courseId: "c1",
    assignmentId: "a1",
    grade: 88,
    date: "2025-05-01"
  },
  {
    id: "g3",
    studentId: "s1",
    courseId: "c1",
    assignmentId: "a5",
    grade: 95,
    date: "2025-05-04"
  },
  {
    id: "g4",
    studentId: "s3",
    courseId: "c2",
    assignmentId: "a2",
    grade: 78,
    date: "2025-05-08"
  }
];
