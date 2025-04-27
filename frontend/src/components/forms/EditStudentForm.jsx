import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudent,
  selectLoading,
  selectError,
} from "@/store/slices/studentsSlice";
import { fetchCourses, selectCourses } from "@/store/slices/coursesSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useToast } from "@/context/ToastContext"; // Import useToast

const EditStudentForm = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    courses: [],
    attendance: 0,
    grade: 0,
    submissions: 0,
  });

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Update form data when student prop changes
  useEffect(() => {
    if (student) {
      setFormData({
        _id: student._id,
        name: student.name,
        email: student.email,
        courses: student.courses.map((course) => course._id),
        attendance: student.attendance || 0,
        grade: student.grade || 0,
        submissions:
          typeof student.submissions === "number" ? student.submissions : 0,
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseToggle = (courseId) => {
    const updatedCourses = formData.courses.includes(courseId)
      ? formData.courses.filter((id) => id !== courseId)
      : [...formData.courses, courseId];

    setFormData({
      ...formData,
      courses: updatedCourses,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateStudent({
        id: formData._id,
        studentData: {
          name: formData.name,
          email: formData.email,
          courses: formData.courses,
          attendance: Number(formData.attendance),
          grade: Number(formData.grade),
          submissions: Number(formData.submissions),
        },
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Student updated successfully", "success"); // Use showToast for success
        onClose();
      })
      .catch((err) => {
        showToast(err || "Failed to update student", "error"); // Use showToast for errors
      });
  };

  if (loading && !courses.length) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Student
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Enrolled Courses
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {courses.map((course) => (
            <FormControlLabel
              key={course._id}
              control={
                <Checkbox
                  checked={formData.courses.includes(course._id)}
                  onChange={() => handleCourseToggle(course._id)}
                />
              }
              label={course.title} // Use `title` instead of `name` or `code`
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Attendance (%)"
            id="attendance"
            name="attendance"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={formData.attendance}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Average Grade (%)"
            id="grade"
            name="grade"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={formData.grade}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Submissions"
            id="submissions"
            name="submissions"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.submissions}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditStudentForm;
