/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGrades,
  createGrade,
  deleteGrade,
  selectGrades,
  selectGradesLoading,
  selectGradesError,
} from "@/store/slices/gradesSlice";
import {
  selectAssignments,
  selectSubmissions,
} from "@/store/slices/assignmentsSlice";
import { selectStudents } from "@/store/slices/studentsSlice";
import { selectCourses } from "@/store/slices/coursesSlice";
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
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Edit, Delete, Add, Assignment } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { drawerWidth } from "@/components/Sidebar";
import EditGradeForm from "@/components/forms/EditGradeForm";
import GradeSubmissionForm from "@/components/forms/GradeSubmissionForm";
import { useToast } from "@/context/ToastContext"; // Import useToast

const Grades = () => {
  const dispatch = useDispatch();
  const grades = useSelector(selectGrades);
  const loading = useSelector(selectGradesLoading);
  const error = useSelector(selectGradesError);
  const assignments = useSelector(selectAssignments);
  const submissions = useSelector(selectSubmissions);
  const students = useSelector(selectStudents);
  const courses = useSelector(selectCourses);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGradingSubmission, setIsGradingSubmission] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    assignmentId: "",
    grade: 0,
    date: new Date().toISOString().split("T")[0],
    semester: "Spring 2025",
  });

  const { showToast } = useToast(); // Use the toast context

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showToast(error, "error"); // Use showToast for errors
    }
  }, [error, showToast]);

  const getFilteredStudents = () => {
    let filteredStudents = students;
    if (selectedCourse && selectedCourse !== "all") {
      filteredStudents = filteredStudents.filter((student) =>
        student.courses.includes(selectedCourse),
      );
    }
    if (search) {
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredStudents;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateGrade = () => {
    if (!formData.studentId || !formData.courseId || !formData.assignmentId) {
      showToast("Please fill in all required fields", "error"); // Use showToast
      return;
    }

    dispatch(createGrade(formData))
      .unwrap()
      .then(() => {
        showToast("Grade created successfully", "success"); // Use showToast
        setIsCreating(false);
        setFormData({
          studentId: "",
          courseId: "",
          assignmentId: "",
          grade: 0,
          date: new Date().toISOString().split("T")[0],
          semester: "Spring 2025",
        });
      })
      .catch((error) => {
        showToast(error.message || "Failed to create grade", "error"); // Use showToast
      });
  };

  const handleEditGrade = (grade) => {
    setSelectedGrade(grade);
    setIsEditing(true);
  };

  const handleDeleteGrade = (id) => {
    dispatch(deleteGrade(id))
      .unwrap()
      .then(() => {
        showToast("Grade deleted successfully", "success"); // Use showToast
      })
      .catch((error) => {
        showToast(error.message || "Failed to delete grade", "error"); // Use showToast
      });
  };

  const handleGradeSubmission = (submissionId) => {
    setSelectedSubmissionId(submissionId);
    setIsGradingSubmission(true);
  };

  const filteredStudents = getFilteredStudents();

  return (
    <Box
      sx={{
        marginLeft: isMobile ? 0 : `${drawerWidth}px`,
        padding: { xs: 2, sm: 3, md: 4 },
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: isMobile ? "80px" : "24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Grades
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsCreating(true)}
        >
          Add Grade
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <TextField
              fullWidth
              label="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl sx={{ minWidth: { xs: "100%", sm: 240 } }}>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <MenuItem value="all">All Courses</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
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
              <TableCell>Course</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Show skeleton rows while loading
              [...Array(5)].map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton variant="text" width={120} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={120} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={120} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="rectangular" width={140} height={32} />
                  </TableCell>
                </TableRow>
              ))
            ) : Array.isArray(grades) && grades.length > 0 ? (
              grades.map((grade) => {
                // Find the corresponding submission for this grade
                const submission = submissions.find(
                  (sub) =>
                    sub.studentId === grade.studentId._id &&
                    sub.assignmentId === grade.assignmentId._id,
                );
                return (
                  <TableRow key={grade._id} hover>
                    <TableCell>
                      {grade.studentId?.name || "Unknown Student"}
                    </TableCell>
                    <TableCell>
                      {grade.courseId?.title || "Unknown Course"}
                    </TableCell>
                    <TableCell>
                      {grade.assignmentId?.title || "Unknown Assignment"}
                    </TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>{grade.semester}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleEditGrade(grade)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteGrade(grade._id)}
                        sx={{ ml: 1 }}
                      >
                        Delete
                      </Button>
                      {submission && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Assignment />}
                          onClick={() => handleGradeSubmission(submission._id)}
                          sx={{ ml: 1 }}
                        >
                          Grade Submission
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No grades found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Grade Dialog */}
      <Dialog
        open={isCreating}
        onClose={() => setIsCreating(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Grade</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Student</InputLabel>
              <Select
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">Select Student</MenuItem>
                {students.map((student) => (
                  <MenuItem key={student._id} value={student._id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">Select Course</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Assignment</InputLabel>
              <Select
                name="assignmentId"
                value={formData.assignmentId}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">Select Assignment</MenuItem>
                {assignments
                  .filter((assignment) => {
                    // Only show assignments for the selected course
                    if (!formData.courseId) return false;
                    return assignment.courseId === formData.courseId;
                  })
                  .map((assignment) => (
                    <MenuItem key={assignment._id} value={assignment._id}>
                      {assignment.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Grade"
              name="grade"
              type="number"
              value={formData.grade}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreating(false)}>Cancel</Button>
          <Button onClick={handleCreateGrade} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Grade Dialog */}
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="sm"
        fullWidth
      >
        <EditGradeForm
          grade={selectedGrade}
          onClose={() => setIsEditing(false)}
        />
      </Dialog>

      {/* Grade Submission Dialog */}
      <Dialog
        open={isGradingSubmission}
        onClose={() => setIsGradingSubmission(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Grade Submission</DialogTitle>
        <GradeSubmissionForm
          submissionId={selectedSubmissionId}
          onClose={() => setIsGradingSubmission(false)}
        />
      </Dialog>
    </Box>
  );
};

export default Grades;
