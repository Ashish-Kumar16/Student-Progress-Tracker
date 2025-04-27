import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubmissionById,
  fetchAssignmentById,
  fetchStudentById,
  updateSubmission,
  selectSelectedSubmission,
  selectSelectedAssignment,
  selectSelectedStudent,
  selectAssignmentsLoading,
  selectAssignmentsError,
  fetchAssignments,
  selectAssignments,
} from "@/store/slices/assignmentsSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  DialogActions,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useToast } from "@/context/ToastContext"; // Import useToast

const GradeSubmissionForm = ({ submissionId, onClose }) => {
  const dispatch = useDispatch();
  const submission = useSelector(selectSelectedSubmission);
  const assignment = useSelector(selectSelectedAssignment);
  const student = useSelector(selectSelectedStudent);
  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);
  const assignments = useSelector(selectAssignments);

  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
    assignmentId: "",
    grade: 0,
    feedback: "",
    status: "graded",
  });

  useEffect(() => {
    dispatch(fetchSubmissionById(submissionId));
  }, [dispatch, submissionId]);

  useEffect(() => {
    if (submission) {
      dispatch(fetchAssignmentById(submission.assignmentId));
      dispatch(fetchStudentById(submission.studentId));
      if (submission.grade !== null && submission.grade !== undefined) {
        setFormData({
          grade: submission.grade,
          feedback: submission.feedback || "",
          status: "graded",
        });
      }
    }
  }, [dispatch, submission]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "grade" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!assignment) {
      showToast("Assignment not found", "error"); // Use showToast for errors
      return;
    }

    if (formData.grade > assignment.totalPoints) {
      showToast(
        `Maximum grade for this assignment is ${assignment.totalPoints}`,
        "error",
      ); // Use showToast for errors
      return;
    }

    dispatch(
      updateSubmission({
        id: submissionId,
        submissionData: {
          ...submission,
          ...formData,
          grade: Number(formData.grade),
        },
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Grade submitted successfully!", "success"); // Use showToast for success
        onClose();
      })
      .catch((err) => {
        showToast(err.message || "Failed to submit grade", "error"); // Use showToast for errors
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !submission || !assignment || !student) {
    return (
      <Typography sx={{ p: 2 }}>
        {error || "Submission, assignment, or student not found"}
      </Typography>
    );
  }

  const studentCourseIds = student?.courses?.map((c) => c._id) || [];
  const courseAssignments = assignments.filter((a) =>
    studentCourseIds.includes(a.courseId),
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Student: {student.name}</Typography>
          <Typography variant="subtitle1">
            Assignment: {assignment.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Submitted:{" "}
            {new Date(submission.submissionDate).toLocaleDateString()}
          </Typography>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="assignment-select-label">Assignment</InputLabel>
          <Select
            labelId="assignment-select-label"
            name="assignmentId"
            value={assignment?._id || ""}
            label="Assignment"
            disabled // Remove this if you want to allow changing assignment
          >
            {courseAssignments.map((a) => (
              <MenuItem key={a._id} value={a._id}>
                {a.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={`Grade (out of ${assignment.totalPoints})`}
          name="grade"
          type="number"
          inputProps={{
            min: 0,
            max: assignment.totalPoints,
          }}
          value={formData.grade}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
          placeholder="Provide feedback on the submission..."
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <DialogActions sx={{ mt: 3, px: 0 }}>
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit Grade
          </Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default GradeSubmissionForm;
