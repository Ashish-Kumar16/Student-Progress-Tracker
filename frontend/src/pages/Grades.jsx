import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAssignments,
  selectSubmissions,
  setSelectedSubmission,
} from "@/store/slices/assignmentsSlice";
import { Eye, Edit, FileText } from "lucide-react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import EditGradeForm from "@/components/forms/EditGradeForm";
import { mockStudents, mockCourses } from "@/data/mockData";
import { drawerWidth } from "@/components/Sidebar"; // Import the sidebar width

const Grades = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(selectAssignments);
  const submissions = useSelector(selectSubmissions);

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSubmission, setSelectedSubmissionState] = useState(null);
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [viewingSubmission, setViewingSubmission] = useState(null);

  const getFilteredStudents = () => {
    let students = [...mockStudents];

    if (selectedCourse && selectedCourse !== "all") {
      students = students.filter((student) =>
        student.courses.includes(selectedCourse),
      );
    }

    if (search) {
      students = students.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return students;
  };

  const getStudentGradeDetails = (studentId) => {
    const studentSubmissions = submissions.filter(
      (sub) => sub.studentId === studentId,
    );

    const filteredSubmissions =
      selectedCourse && selectedCourse !== "all"
        ? studentSubmissions.filter((sub) => {
            const assignment = assignments.find(
              (a) => a.id === sub.assignmentId,
            );
            return assignment?.courseId === selectedCourse;
          })
        : studentSubmissions;

    const totalSubmissions = filteredSubmissions.length;
    const gradedSubmissions = filteredSubmissions.filter(
      (sub) => sub.status === "graded",
    ).length;
    const totalPoints = filteredSubmissions.reduce((sum, sub) => {
      if (sub.grade === null) return sum;
      const assignment = assignments.find((a) => a.id === sub.assignmentId);
      return sum + (assignment?.totalPoints || 0);
    }, 0);
    const earnedPoints = filteredSubmissions.reduce(
      (sum, sub) => sum + (sub.grade || 0),
      0,
    );

    const averageGrade =
      totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

    return {
      totalSubmissions,
      gradedSubmissions,
      averageGrade: averageGrade.toFixed(1),
      submissions: filteredSubmissions,
    };
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    const { submissions } = getStudentGradeDetails(student.id);
    setStudentAssignments(submissions);
    setIsViewingDetails(true);
  };

  const openGradeDialog = (submission) => {
    setSelectedSubmissionState(submission);
    dispatch(setSelectedSubmission(submission));
    setIsGrading(true);
  };

  const viewSubmission = (submission) => {
    setViewingSubmission(submission);
  };

  const students = getFilteredStudents();

  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`, // Offset for the sidebar
        padding: 4,
        maxWidth: "1200px", // Center the content
        margin: "0 auto", // Horizontally center the content
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Grades
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <FormControl sx={{ minWidth: 240 }}>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <MenuItem value="all">All Courses</MenuItem>
                {mockCourses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Submissions</TableCell>
              <TableCell>Average Grade</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => {
              const { totalSubmissions, gradedSubmissions, averageGrade } =
                getStudentGradeDetails(student.id);

              return (
                <TableRow key={student.id} hover>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {gradedSubmissions} / {totalSubmissions} graded
                  </TableCell>
                  <TableCell>{averageGrade}%</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Eye size={16} />}
                      onClick={() => viewStudentDetails(student)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Grade Details Dialog */}
      <Dialog
        open={isViewingDetails}
        onClose={() => setIsViewingDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Grade Details for {selectedStudent?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Assignment Submissions
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentAssignments.length > 0 ? (
                  studentAssignments.map((submission) => {
                    const assignment = assignments.find(
                      (a) => a.id === submission.assignmentId,
                    );
                    const course = mockCourses.find(
                      (c) => c.id === assignment?.courseId,
                    );

                    return (
                      <TableRow key={submission.id} hover>
                        <TableCell>{assignment?.title || "Unknown"}</TableCell>
                        <TableCell>{course?.name || "Unknown"}</TableCell>
                        <TableCell>
                          {new Date(
                            submission.submittedDate,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{submission.status}</TableCell>
                        <TableCell>
                          {submission.grade !== null
                            ? `${submission.grade}/${assignment?.totalPoints}`
                            : "Not graded"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FileText size={16} />}
                            onClick={() => viewSubmission(submission)}
                          >
                            View
                          </Button>
                          {submission.status !== "graded" && (
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ ml: 1 }}
                              startIcon={<Edit size={16} />}
                              onClick={() => {
                                setIsViewingDetails(false);
                                openGradeDialog(submission);
                              }}
                            >
                              Grade
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No submissions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewingDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Grade Submission Dialog */}
      <Dialog
        open={isGrading}
        onClose={() => setIsGrading(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Grade Submission</DialogTitle>
        <DialogContent>
          {selectedSubmission && (
            <EditGradeForm
              submission={selectedSubmission}
              onClose={() => setIsGrading(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Submission Dialog */}
      <Dialog
        open={Boolean(viewingSubmission)}
        onClose={() => setViewingSubmission(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submission Details</DialogTitle>
        <DialogContent>
          {viewingSubmission && (
            <Box>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                <Box>
                  <Typography variant="caption">Student</Typography>
                  <Typography>
                    {mockStudents.find(
                      (s) => s.id === viewingSubmission.studentId,
                    )?.name || "Unknown"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Assignment</Typography>
                  <Typography>
                    {assignments.find(
                      (a) => a.id === viewingSubmission.assignmentId,
                    )?.title || "Unknown"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Submitted Date</Typography>
                  <Typography>
                    {new Date(
                      viewingSubmission.submittedDate,
                    ).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Status</Typography>
                  <Typography>{viewingSubmission.status}</Typography>
                </Box>
              </Box>

              <Box mb={2}>
                <Typography variant="caption">Grade</Typography>
                <Typography>
                  {viewingSubmission.grade !== null
                    ? `${viewingSubmission.grade}/${
                        assignments.find(
                          (a) => a.id === viewingSubmission.assignmentId,
                        )?.totalPoints || 100
                      }`
                    : "Not graded"}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="caption">Feedback</Typography>
                <Typography>
                  {viewingSubmission.feedback || "No feedback provided yet."}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="flex-end" gap={1}>
                {viewingSubmission.status !== "graded" && (
                  <Button
                    variant="contained"
                    startIcon={<Edit size={16} />}
                    onClick={() => {
                      setViewingSubmission(null);
                      openGradeDialog(viewingSubmission);
                    }}
                  >
                    Grade
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={() => setViewingSubmission(null)}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Grades;
