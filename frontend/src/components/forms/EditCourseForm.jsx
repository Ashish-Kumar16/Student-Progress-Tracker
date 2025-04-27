import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse, selectLoading } from "@/store/slices/coursesSlice";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useToast } from "@/context/ToastContext"; // Import useToast

const EditCourseForm = ({ course, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
    instructor: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        credits: course.credits || "",
        instructor: course.instructor || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCourse({
          id: course._id,
          courseData: {
            ...formData,
            credits: parseInt(formData.credits, 10),
          },
        }),
      ).unwrap();
      showToast("Course updated successfully!", "success"); // Use showToast for success
      onClose();
    } catch (error) {
      showToast(error?.message || "Failed to update course", "error"); // Use showToast for errors
    }
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
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Credits"
          name="credits"
          type="number"
          value={formData.credits}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          disabled={isLoading}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          disabled={isLoading}
        />
      </Box>

      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditCourseForm;
