/* eslint-disable no-unused-vars */
import { useState } from "react";
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
  Badge,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  mockAssignments,
  mockCourses,
  mockSubmissions,
  mockStudents,
} from "@/data/mockData";
import AddAssignmentForm from "@/components/forms/AddAssignmentForm";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Assignments = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const handleAddAssignmentOpen = () => {
    setIsAddAssignmentDialogOpen(true);
  };

  const handleAddAssignmentClose = () => {
    setIsAddAssignmentDialogOpen(false);
  };

  const filteredAssignments = mockAssignments.filter(
    (assignment) =>
      (selectedCourse && selectedCourse !== "all"
        ? assignment.courseId === selectedCourse
        : true) &&
      assignment.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteAssignment = () => {
    // This would remove the assignment from the database
    toast.success("Assignment deleted successfully");
    setSelectedAssignment(null);
    setIsDeleteDialogOpen(false);
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
    const assignment = mockAssignments.find((a) => a.id === assignmentId);
    if (!assignment) return [];

    // Get students enrolled in the course
    const studentsInCourse = mockStudents.filter((student) =>
      student.courses.includes(assignment.courseId),
    );

    // Get students who already submitted
    const submittedStudentIds = mockSubmissions
      .filter((sub) => sub.assignmentId === assignmentId)
      .map((sub) => sub.studentId);

    // Return students who haven't submitted yet
    return studentsInCourse.filter(
      (student) => !submittedStudentIds.includes(student.id),
    );
  };

  const handleSubmitForStudent = () => {
    if (
      !selectedStudent ||
      !selectedAssignmentForSubmission ||
      !submissionText.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // This would create a new submission in the database
    toast.success(
      `Submission created for ${
        mockStudents.find((s) => s.id === selectedStudent)?.name
      }`,
    );
    setIsSubmitDialogOpen(false);
    setSubmissionText("");
    setSelectedStudent("");
  };

  const submissions = mockSubmissions.filter(
    (submission) =>
      !selectedCourse ||
      selectedCourse === "all" ||
      mockAssignments.find((a) => a.id === submission.assignmentId)
        ?.courseId === selectedCourse,
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
                  {mockCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
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
                  {filteredAssignments.map((assignment) => {
                    const assignmentSubmissions = mockSubmissions.filter(
                      (s) => s.assignmentId === assignment.id,
                    );
                    const submissionCount = assignmentSubmissions.length;
                    const course = mockCourses.find(
                      (c) => c.id === assignment.courseId,
                    );
                    const studentsInCourse = mockStudents.filter((s) =>
                      s.courses.includes(assignment.courseId),
                    ).length;

                    return (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.title}</TableCell>
                        <TableCell>{course?.name || "Unknown"}</TableCell>
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
                              // Edit assignment
                              toast.info("Edit functionality would go here");
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
                  })}
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
                  {submissions.map((submission) => {
                    const student = mockStudents.find(
                      (s) => s.id === submission.studentId,
                    );
                    const assignment = mockAssignments.find(
                      (a) => a.id === submission.assignmentId,
                    );
                    const course = assignment
                      ? mockCourses.find((c) => c.id === assignment.courseId)
                      : null;

                    return (
                      <TableRow key={submission.id}>
                        <TableCell>{student?.name || "Unknown"}</TableCell>
                        <TableCell>{assignment?.title || "Unknown"}</TableCell>
                        <TableCell>{course?.name || "Unknown"}</TableCell>
                        <TableCell>
                          {new Date(
                            submission.submittedDate,
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
                                // Grade submission
                                toast.info("Grade dialog would open here");
                              }}
                            >
                              Grade
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                    {mockCourses.find(
                      (c) => c.id === selectedAssignment.courseId,
                    )?.name || "Unknown"}
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
                    {selectedAssignment.description}
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
                      {mockSubmissions
                        .filter(
                          (sub) => sub.assignmentId === selectedAssignment.id,
                        )
                        .map((submission) => {
                          const student = mockStudents.find(
                            (s) => s.id === submission.studentId,
                          );
                          return (
                            <TableRow key={submission.id}>
                              <TableCell>
                                {student?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  submission.submittedDate,
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
            onClick={() => handleDeleteAssignment(selectedAssignment?.id)}
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
                    selectedAssignmentForSubmission.id,
                  ).map((student) => (
                    <MenuItem key={student.id} value={student.id}>
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
