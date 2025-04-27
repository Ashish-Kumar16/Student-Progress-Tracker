import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGrade, fetchGrades } from "@/store/slices/gradesSlice";
import {
  fetchAssignments,
  selectAssignments,
} from "@/store/slices/assignmentsSlice";
import { fetchStudents, selectStudents } from "@/store/slices/studentsSlice";
import { fetchCourses, selectCourses } from "@/store/slices/coursesSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useToast } from "@/context/ToastContext"; // Import useToast

const EditGradeForm = ({ grade, onClose }) => {
  const dispatch = useDispatch();
  const assignments = useSelector(selectAssignments);
  const students = useSelector(selectStudents);
  const courses = useSelector(selectCourses);

  const { showToast } = useToast(); // Use the toast context

  const [formData, setFormData] = useState({
    _id: "",
    studentId: "",
    courseId: "",
    assignmentId: "",
    grade: 0,
    date: "",
    semester: "",
  });

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
    dispatch(fetchAssignments());
  }, [dispatch]);

  useEffect(() => {
    if (grade) {
      setFormData({
        _id: grade._id,
        studentId: grade.studentId._id || grade.studentId || "",
        courseId: grade.courseId._id || grade.courseId || "",
        assignmentId: grade.assignmentId._id || grade.assignmentId || "",
        grade: grade.grade || 0,
        date: grade.date
          ? new Date(grade.date).toISOString().split("T")[0]
          : "",
        semester: grade.semester || "",
      });
    }
  }, [grade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.courseId || !formData.assignmentId) {
      showToast("Please fill in all required fields", "error"); // Use showToast for errors
      return;
    }

    const assignment = assignments.find((a) => a._id === formData.assignmentId);
    const maxPoints = assignment ? assignment.totalPoints : 100;

    if (formData.grade > maxPoints) {
      showToast(`Maximum grade for this assignment is ${maxPoints}`, "error"); // Use showToast for errors
      return;
    }

    dispatch(
      updateGrade({
        id: formData._id,
        gradeData: {
          ...formData,
          grade: Number(formData.grade),
        },
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Grade updated successfully", "success"); // Use showToast for success
        dispatch(fetchGrades());
        onClose();
      })
      .catch((error) => {
        showToast(error.message || "Failed to update grade", "error"); // Use showToast for errors
      });
  };

  const student = formData.studentId
    ? students?.find((s) => s._id === formData.studentId) || null
    : null;
  const assignment = formData.assignmentId
    ? assignments?.find((a) => a._id === formData.assignmentId) || null
    : null;
  const course = formData.courseId
    ? courses?.find((c) => c._id === formData.courseId) || null
    : null;

  if (!students || !courses || !assignments) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 2 }}>
        {student && assignment && course && (
          <Box sx={{ mb: 3 }}>
            <Typography>
              <strong>Student:</strong> {student.name}
            </Typography>
            <Typography>
              <strong>Course:</strong> {course.title}
            </Typography>
            <Typography>
              <strong>Assignment:</strong> {assignment.title}
            </Typography>
            <Typography>
              <strong>Max Points:</strong> {assignment.totalPoints}
            </Typography>
          </Box>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Student</InputLabel>
          <Select
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="">Select Student</MenuItem>
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="">Select Course</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Assignment</InputLabel>
          <Select
            name="assignmentId"
            value={formData.assignmentId}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="">Select Assignment</MenuItem>
            {assignments
              .filter(
                (assignment) => assignment.courseId?._id === formData.courseId,
              )
              .map((assignment) => (
                <MenuItem key={assignment._id} value={assignment._id}>
                  {assignment.title}
                </MenuItem>
              ))}
            {assignments.filter(
              (assignment) => assignment.courseId?._id === formData.courseId,
            ).length === 0 && (
              <MenuItem disabled>No assignments available</MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          label="Grade"
          name="grade"
          type="number"
          inputProps={{
            min: 0,
            max: assignment?.totalPoints || 100,
          }}
          value={formData.grade}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Semester"
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Save Grade
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default EditGradeForm;
