/* eslint-disable no-unused-vars */
import { useState } from "react";
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
} from "@mui/material";
import { toast } from "sonner";
import { mockCourses } from "@/data/mockData";
import { useDispatch } from "react-redux";

const AddAssignmentForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    description: "",
    dueDate: "",
    totalPoints: 100,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting assignment:", formData);
    // This would normally be an API call or dispatch to Redux
    toast.success(`Assignment ${formData.title} added successfully!`);
    if (onClose) onClose(); // Close the dialog after submission
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
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select
            labelId="course-select-label"
            label="Course"
            value={formData.courseId}
            onChange={(e) =>
              setFormData({ ...formData, courseId: e.target.value })
            }
          >
            {mockCourses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name} ({course.code})
              </MenuItem>
            ))}
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
            />
          </Grid>
        </Grid>

        <DialogActions sx={{ mt: 3, px: 0 }}>
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Assignment
          </Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default AddAssignmentForm;
