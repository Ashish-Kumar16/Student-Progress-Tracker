import { useState } from "react";
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
} from "@mui/material";
import { mockCourses } from "@/data/mockData";
import { toast } from "sonner";

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courses: [],
  });

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
    console.log("Submitting student:", formData);
    toast.success(`Student ${formData.name} added successfully!`);
  };

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
                    mockCourses.find((course) => course.id === id)?.code || id
                  }
                />
              ))}
            </Box>
          )}
        >
          {mockCourses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name} ({course.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" type="button">
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
