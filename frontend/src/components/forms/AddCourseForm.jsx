import { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { toast } from "sonner";

const AddCourseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
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
    console.log("Submitting course:", formData);
    // This would normally be an API call
    toast.success(`Course ${formData.name} added successfully!`);
    if (onClose) onClose(); // Close the dialog after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Course
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Course Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Mathematics 101"
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Course Code"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          placeholder="MATH101"
          required
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Course description..."
          multiline
          rows={3}
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
            Add Course
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCourseForm;
