/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  DialogActions,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "../../store/slices/assignmentsSlice";
import {
  selectStudents,
  selectLoading,
  selectError,
  fetchStudents,
} from "../../store/slices/studentsSlice";
import { selectCourses } from "@/store/slices/coursesSlice";
import { useToast } from "@/context/ToastContext"; // Import useToast

const AddAssignmentForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const students = useSelector(selectStudents);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    description: "",
    dueDate: "",
    totalPoints: 100,
    studentIds: [],
  });

  // Fetch students on mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Handle error from Redux state
  useEffect(() => {
    if (error) {
      showToast(error, "error"); // Use showToast for errors
    }
  }, [error, showToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStudentChange = (e) => {
    setFormData({
      ...formData,
      studentIds: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.courseId || !formData.dueDate) {
      showToast("Please fill in all required fields", "error"); // Use showToast for errors
      return;
    }

    try {
      const assignmentData = {
        ...formData,
        studentIds:
          formData.studentIds.length > 0 ? formData.studentIds : undefined,
      };

      await dispatch(createAssignment(assignmentData)).unwrap();
      showToast(
        `Assignment "${formData.title}" added successfully!`,
        "success",
      ); // Use showToast for success
      setFormData({
        title: "",
        courseId: "",
        description: "",
        dueDate: "",
        totalPoints: 100,
        studentIds: [],
      });
      if (onClose) onClose();
    } catch (err) {
      showToast(`Failed to create assignment: ${err.message}`, "error"); // Use showToast for errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 2 }}>
        <TextField
          label="Assignment Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Math Quiz 1"
          required
          fullWidth
          margin="normal"
          disabled={loading}
        />

        <FormControl fullWidth margin="normal" disabled={loading}>
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select
            labelId="course-select-label"
            label="Course"
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="" disabled>
              Select a course
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title} ({course.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={loading}>
          <InputLabel id="students-select-label">
            Students (Optional)
          </InputLabel>
          <Select
            labelId="students-select-label"
            label="Students (Optional)"
            name="studentIds"
            multiple
            value={formData.studentIds}
            onChange={handleStudentChange}
            renderValue={(selected) =>
              selected
                .map(
                  (id) => students.find((s) => s._id === id)?.name || "Unknown",
                )
                .join(", ")
            }
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 2 }} />
                Loading students...
              </MenuItem>
            ) : students.length > 0 ? (
              students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name} ({student.email})
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No students available</MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Assignment description..."
          multiline
          rows={3}
          fullWidth
          margin="normal"
          disabled={loading}
        />

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Points"
              name="totalPoints"
              type="number"
              inputProps={{ min: 1, max: 100 }}
              value={formData.totalPoints}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
        </Grid>

        <DialogActions sx={{ mt: 3, px: 0 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Adding..." : "Add Assignment"}
          </Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default AddAssignmentForm;
