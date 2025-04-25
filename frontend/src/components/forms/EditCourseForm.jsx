import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCourse } from "@/store/slices/coursesSlice";
import { mockStudents } from "@/data/mockData";
import { toast } from "sonner";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const EditCourseForm = ({ course, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    code: "",
    description: "",
    students: [],
  });

  useEffect(() => {
    if (course) {
      setFormData({
        id: course.id,
        name: course.name,
        code: course.code,
        description: course.description,
        students: course.students || [], 
      });
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStudentToggle = (studentId) => {
    const updatedStudents = formData.students.includes(studentId)
      ? formData.students.filter((id) => id !== studentId)
      : [...formData.students, studentId];

    setFormData({
      ...formData,
      students: updatedStudents,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateCourse(formData));
    toast.success("Course updated successfully");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Course
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Course Name"
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
          label="Course Code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Enrolled Students
        </Typography>
        <Box
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
            p: 2,
          }}
        >
          {mockStudents.map((student) => (
            <FormControlLabel
              key={student.id}
              control={
                <Checkbox
                  checked={formData.students.includes(student.id)}
                  onChange={() => handleStudentToggle(student.id)}
                />
              }
              label={`${student.name} (${student.email})`}
            />
          ))}
        </Box>
      </Box>

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

export default EditCourseForm;
