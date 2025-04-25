import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/store/slices/studentsSlice";
import { mockCourses } from "@/data/mockData";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";

const EditStudentForm = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    courses: [],
    attendance: 0,
    grade: 0,
    submissions: 0,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        email: student.email,
        courses: student.courses,
        attendance: student.attendance,
        grade: student.grade,
        submissions: student.submissions,
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
        ...formData,
        attendance: Number(formData.attendance),
        grade: Number(formData.grade),
        submissions: Number(formData.submissions),
      }),
    );

    toast.success("Student updated successfully");
    onClose();
  };

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
          {mockCourses.map((course) => (
            <FormControlLabel
              key={course.id}
              control={
                <Checkbox
                  checked={formData.courses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                />
              }
              label={`${course.name} (${course.code})`}
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
