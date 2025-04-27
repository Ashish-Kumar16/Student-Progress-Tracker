/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Import react-toastify
import {
  fetchAssignments,
  deleteAssignment,
  selectAssignments,
  selectAssignmentsLoading,
  selectSubmissions,
  selectAssignmentsError,
} from "../store/slices/assignmentsSlice";
import {
  fetchStudents,
  selectStudents,
  selectError,
} from "../store/slices/studentsSlice";
import {
  fetchSubmissions,
  createSubmission,
} from "../store/slices/submissionSlice";
import AddAssignmentForm from "@/components/forms/AddAssignmentForm";

const Assignments = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Redux state
  const assignments = useSelector(selectAssignments);
  const submissions = useSelector(selectSubmissions);
  const students = useSelector(selectStudents);
  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);

  // Local state
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activeTab, setActiveTab] = useState("assignments");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] =
    useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [submissionText, setSubmissionText] = useState("");
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] =
    useState(false);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAssignments());
    dispatch(fetchSubmissions());
    dispatch(fetchStudents()); // Added to fetch students
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred"); // Use react-toastify
    }
  }, [error]);

  // Handle studentsSlice errors
  const studentsError = useSelector(selectError);
  useEffect(() => {
    if (studentsError) {
      toast.error(studentsError || "An error occurred while fetching students"); // Use react-toastify
    }
  }, [studentsError]);

  const handleAddAssignmentOpen = () => {
    setIsAddAssignmentDialogOpen(true);
  };

  const handleAddAssignmentClose = () => {
    setIsAddAssignmentDialogOpen(false);
  };

  // Filter assignments based on search and course
  const filteredAssignments = assignments.filter(
    (assignment) =>
      (selectedCourse && selectedCourse !== "all"
        ? assignment.courseId?._id === selectedCourse
        : true) &&
      assignment.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteAssignment = (id) => {
    dispatch(deleteAssignment(id))
      .unwrap()
      .then(() => {
        toast.success("Assignment deleted successfully"); // Use react-toastify
        setSelectedAssignment(null);
        setIsDeleteDialogOpen(false);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete assignment"); // Use react-toastify
      });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "graded":
        return <CheckCircle size={16} color={theme.palette.success.main} />;
      case "submitted":
        return <FileText size={16} color={theme.palette.primary.main} />;
      case "late":
        return <Clock size={16} color={theme.palette.warning.main} />;
      default:
        return null;
    }
  };

  const getStudentsWhoCanSubmit = (assignmentId) => {
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) return [];

    // Get students enrolled in the course
    const studentsInCourse = students.filter((student) =>
      student.courses.some((course) => course._id === assignment.courseId?._id),
    );

    // Get students who already submitted
    const submittedStudentIds = submissions
      .filter((sub) => sub.assignmentId?._id === assignmentId)
      .map((sub) => sub.studentId?._id);

    // Return students who haven't submitted yet
    return studentsInCourse.filter(
      (student) => !submittedStudentIds.includes(student._id),
    );
  };

  const handleSubmitForStudent = () => {
    if (
      !selectedStudent ||
      !selectedAssignmentForSubmission ||
      !submissionText.trim()
    ) {
      toast.error("Please fill in all fields"); // Use react-toastify
      return;
    }

    const submissionData = {
      studentId: selectedStudent,
      assignmentId: selectedAssignmentForSubmission._id,
      submissionDate: new Date().toISOString(),
      status: "submitted",
      feedback: submissionText,
    };

    dispatch(createSubmission(submissionData))
      .unwrap()
      .then(() => {
        toast.success(
          `Submission created for ${
            students.find((s) => s._id === selectedStudent)?.name
          }`,
        ); // Use react-toastify
        setIsSubmitDialogOpen(false);
        setSubmissionText("");
        setSelectedStudent("");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to create submission"); // Use react-toastify
      });
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      !selectedCourse ||
      selectedCourse === "all" ||
      assignments.find((a) => a._id === submission.assignmentId?._id)?.courseId
        ?._id === selectedCourse,
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Extract unique courses from assignments
  const courses = [
    ...new Set(
      assignments
        .filter((a) => a.courseId)
        .map((a) => JSON.stringify(a.courseId)),
    ),
  ].map((c) => JSON.parse(c));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Assignments
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={handleAddAssignmentOpen}
          disabled={loading}
        >
          Add Assignment
        </Button>
      </Box>

      {/* Add Assignment Dialog */}
      <Dialog
        open={isAddAssignmentDialogOpen}
        onClose={handleAddAssignmentClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent>
          <AddAssignmentForm onClose={handleAddAssignmentClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAssignmentClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Eye size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="course-select-label">Course</InputLabel>
                <Select
                  labelId="course-select-label"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  <MenuItem value="all">All Courses</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.title} ({course.credits} credits)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Assignments" value="assignments" />
              <Tab label="Submissions" value="submissions" />
            </Tabs>
          </Box>

          {activeTab === "assignments" && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Total Points</TableCell>
                    <TableCell>Submissions</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredAssignments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No assignments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssignments.map((assignment) => {
                      const assignmentSubmissions = submissions.filter(
                        (s) => s.assignmentId?._id === assignment._id,
                      );
                      const submissionCount = assignmentSubmissions.length;
                      const studentsInCourse = students.filter((s) =>
                        s.courses.some(
                          (course) => course._id === assignment.courseId?._id,
                        ),
                      ).length;

                      return (
                        <TableRow key={assignment._id}>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>
                            {assignment.courseId?.title || "Unknown"}
                          </TableCell>
                          <TableCell>
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{assignment.totalPoints}</TableCell>
                          <TableCell>
                            <Chip
                              label={`${submissionCount} / ${studentsInCourse}`}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setSelectedAssignment(assignment);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye size={20} />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                toast.info("Edit functionality would go here"); // Use react-toastify
                              }}
                            >
                              <Edit size={20} />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => {
                                setSelectedAssignment(assignment);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab === "submissions" && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Submitted Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No submissions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => {
                      const student = students.find(
                        (s) => s._id === submission.studentId?._id,
                      );
                      const assignment = assignments.find(
                        (a) => a._id === submission.assignmentId?._id,
                      );
                      const course = assignment?.courseId;

                      return (
                        <TableRow key={submission._id}>
                          <TableCell>{student?.name || "Unknown"}</TableCell>
                          <TableCell>
                            {assignment?.title || "Unknown"}
                          </TableCell>
                          <TableCell>{course?.title || "Unknown"}</TableCell>
                          <TableCell>
                            {new Date(
                              submission.submissionDate,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {getStatusIcon(submission.status)}
                              <Typography sx={{ textTransform: "capitalize" }}>
                                {submission.status}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {submission.grade !== null
                              ? `${submission.grade}/${
                                  assignment?.totalPoints || 100
                                }`
                              : "Not graded"}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye size={20} />
                            </IconButton>
                            {submission.status !== "graded" && (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  toast.info("Grade dialog would open here"); // Use react-toastify
                                }}
                              >
                                Grade
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* View Assignment Dialog */}
      <Dialog
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Assignment Details</DialogTitle>
        <DialogContent>
          {selectedAssignment && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Title
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAssignment.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Course
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAssignment.courseId?.title || "Unknown"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Due Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Points
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAssignment.totalPoints}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAssignment.description || "No description"}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Submissions</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={() => {
                      setSelectedAssignmentForSubmission(selectedAssignment);
                      setIsSubmitDialogOpen(true);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    Submit for Student
                  </Button>
                </Box>

                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Submitted Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {submissions
                        .filter(
                          (sub) =>
                            sub.assignmentId?._id === selectedAssignment._id,
                        )
                        .map((submission) => {
                          const student = students.find(
                            (s) => s._id === submission.studentId?._id,
                          );
                          return (
                            <TableRow key={submission._id}>
                              <TableCell>
                                {student?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  submission.submissionDate,
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell sx={{ textTransform: "capitalize" }}>
                                {submission.status}
                              </TableCell>
                              <TableCell>
                                {submission.grade !== null
                                  ? `${submission.grade}/${selectedAssignment.totalPoints}`
                                  : "Not graded"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Assignment Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this assignment? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => handleDeleteAssignment(selectedAssignment?._id)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submit for Student Dialog */}
      <Dialog
        open={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit Assignment for Student</DialogTitle>
        <DialogContent>
          {selectedAssignmentForSubmission && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Assignment: {selectedAssignmentForSubmission.title}
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="student-select-label">Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  label="Student"
                >
                  {getStudentsWhoCanSubmit(
                    selectedAssignmentForSubmission._id,
                  ).map((student) => (
                    <MenuItem key={student._id} value={student._id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Submission Notes"
                multiline
                rows={4}
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitForStudent} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Assignments;
