
import { useState, useEffect } from "react";
import { 
  Box, Button, TextField, Grid, Typography,
  DialogActions
} from '@mui/material';
import { toast } from "sonner";
import { mockSubmissions, mockAssignments, mockStudents } from "@/data/mockData";
import { useDispatch } from "react-redux";

const GradeSubmissionForm = ({ submissionId, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    grade: 0,
    feedback: "",
  });

  const submission = mockSubmissions.find(s => s.id === submissionId);
  const assignment = submission 
    ? mockAssignments.find(a => a.id === submission.assignmentId)
    : null;
  const student = submission 
    ? mockStudents.find(s => s.id === submission.studentId)
    : null;

  useEffect(() => {
    if (submission && submission.grade !== null) {
      setFormData({
        grade: submission.grade,
        feedback: submission.feedback || "",
      });
    }
  }, [submission]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "grade" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting grade:", {
      submissionId,
      ...formData
    });
    // This would normally dispatch to Redux or API call
    toast.success(`Grade submitted successfully!`);
    onClose();
  };

  if (!submission || !assignment || !student) {
    return <Typography>Submission not found</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            Student: {student.name}
          </Typography>
          <Typography variant="subtitle1">
            Assignment: {assignment.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
          </Typography>
        </Box>
        
        <TextField 
          label={`Grade (out of ${assignment.totalPoints})`}
          name="grade" 
          type="number" 
          inputProps={{ 
            min: 0,
            max: assignment.totalPoints
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
