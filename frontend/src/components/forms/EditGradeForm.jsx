import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSubmission } from "@/store/slices/assignmentsSlice";
import { mockAssignments, mockStudents } from "@/data/mockData";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { toast } from "sonner";

const EditGradeForm = ({ submission, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    studentId: "",
    assignmentId: "",
    submittedDate: "",
    status: "",
    grade: 0,
    feedback: "",
  });

  useEffect(() => {
    if (submission) {
      setFormData({
        id: submission.id,
        studentId: submission.studentId,
        assignmentId: submission.assignmentId,
        submittedDate: submission.submittedDate,
        status: "graded", // Always set to graded when updating
        grade: submission.grade || 0,
        feedback: submission.feedback || "",
      });
    }
  }, [submission]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const assignment = mockAssignments.find(
      (a) => a.id === formData.assignmentId,
    );
    const maxPoints = assignment ? assignment.totalPoints : 100;

    if (formData.grade > maxPoints) {
      toast.error(`Maximum grade for this assignment is ${maxPoints}`);
      return;
    }

    dispatch(
      updateSubmission({
        ...formData,
        grade: Number(formData.grade),
      }),
    );

    toast.success("Submission graded successfully");
    onClose();
  };

  // Get student and assignment details
  const student = mockStudents.find((s) => s.id === formData.studentId);
  const assignment = mockAssignments.find(
      (a) => a.id === formData.assignmentId,
    );

  return (
    <form onSubmit={handleSubmit}>
      {student && assignment && (
        <Box sx={{ mb: 3 }}>
          <Typography>
            <strong>Student:</strong> {student.name}
          </Typography>
          <Typography>
            <strong>Assignment:</strong> {assignment.title}
          </Typography>
          <Typography>
            <strong>Max Points:</strong> {assignment.totalPoints}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Grade"
          id="grade"
          name="grade"
          type="number"
          inputProps={{
            min: 0,
            max: assignment?.totalPoints || 100,
          }}
          value={formData.grade}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Feedback"
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
          multiline
          rows={4}
          placeholder="Provide feedback on this submission..."
          fullWidth
          margin="normal"
        />
      </Box>

      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Save Grade
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditGradeForm;
