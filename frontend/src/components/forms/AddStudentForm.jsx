import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  selectLoading,
  selectError,
} from "@/store/slices/studentsSlice";
import { fetchCourses, selectCourses } from "@/store/slices/coursesSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useToast } from "@/context/ToastContext"; // Import useToast

const AddStudentForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    setFormData({
      ...formData,
      courses: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addStudent({
        name: formData.name,
        email: formData.email,
        courses: formData.courses,
        attendance: Number(formData.attendance),
        grade: Number(formData.grade),
        submissions: Number(formData.submissions),
      }),
    )
      .unwrap()
      .then(() => {
        showToast(`Student ${formData.name} added successfully!`, "success"); // Use showToast for success
        onClose();
      })
      .catch((err) => {
        showToast(err || "Failed to add student", "error"); // Use showToast for errors
      });
  };

  if (loading && !courses.length) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Student
      </Typography>

      <TextField
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="John Doe"
        fullWidth
        required
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="john@example.com"
        fullWidth
        required
      />

      <FormControl fullWidth>
        <InputLabel id="courses-label">Courses</InputLabel>
        <Select
          labelId="courses-label"
          id="courses"
          name="courses"
          multiple
          value={formData.courses}
          onChange={handleCourseChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => (
                <Chip
                  key={id}
                  label={
                    courses.find((course) => course._id === id)?.title || id
                  } // Use `title` instead of `code`
                />
              ))}
            </Box>
          )}
        >
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.title} {/* Use `title` instead of `name` or `code` */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Attendance (%)"
        id="attendance"
        name="attendance"
        type="number"
        inputProps={{ min: 0, max: 100 }}
        value={formData.attendance}
        onChange={handleInputChange}
        fullWidth
      />

      <TextField
        label="Average Grade (%)"
        id="grade"
        name="grade"
        type="number"
        inputProps={{ min: 0, max: 100 }}
        value={formData.grade}
        onChange={handleInputChange}
        fullWidth
      />

      <TextField
        label="Submissions"
        id="submissions"
        name="submissions"
        type="number"
        inputProps={{ min: 0 }}
        value={formData.submissions}
        onChange={handleInputChange}
        fullWidth
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Add Student
        </Button>
      </Box>
    </Box>
  );
};

export default AddStudentForm;
