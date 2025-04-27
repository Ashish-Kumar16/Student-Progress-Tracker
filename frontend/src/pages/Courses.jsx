import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchCourseById,
  deleteCourse,
  selectCourses,
  selectSelectedCourse,
  selectLoading,
  selectError,
} from "../store/slices/coursesSlice";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import AddCourseForm from "../components/forms/AddCourseForm";
import EditCourseForm from "../components/forms/EditCourseForm";
import { useToast } from "@/context/ToastContext"; // Import useToast

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const selectedCourse = useSelector(selectSelectedCourse);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { showToast } = useToast(); // Use the toast context

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showToast(error, "error"); // Use showToast for errors
    }
  }, [error, showToast]);

  // Filter courses based on search input
  const filteredCourses = (courses || []).filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()),
  );

  // Open dialog functions
  const openViewDialog = (courseId) => {
    dispatch(fetchCourseById(courseId));
    setIsViewOpen(true);
  };

  const openEditDialog = (courseId) => {
    dispatch(fetchCourseById(courseId));
    setIsEditOpen(true);
  };

  const openDeleteDialog = (course) => {
    setCourseToDelete(course);
    setIsDeleteOpen(true);
  };

  // Handle course deletion
  const handleDelete = async () => {
    try {
      await dispatch(deleteCourse(courseToDelete._id)).unwrap();
      setIsDeleteOpen(false);
      showToast("Course deleted successfully", "success"); // Use showToast for success
    } catch (error) {
      showToast(error, "error"); // Use showToast for errors
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with title and Add Course button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Courses</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={() => setIsAddOpen(true)}
          disabled={loading}
        >
          Add Course
        </Button>
      </Box>

      {/* Search input */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ maxWidth: 400 }}
          disabled={loading}
        />
      </Paper>

      {/* Courses table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {course.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {course.description}
                  </TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Eye size={16} />}
                      onClick={() => openViewDialog(course._id)}
                      sx={{ mr: 1 }}
                      disabled={loading}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit size={16} />}
                      onClick={() => openEditDialog(course._id)}
                      sx={{ mr: 1 }}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<Trash2 size={16} />}
                      onClick={() => openDeleteDialog(course)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Course Dialog */}
      <Dialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <AddCourseForm onClose={() => setIsAddOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* View Course Dialog */}
      <Dialog
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Title
                  </Typography>
                  <Typography>{selectedCourse.title}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Credits
                  </Typography>
                  <Typography>{selectedCourse.credits}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography>{selectedCourse.description}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Instructor
                </Typography>
                <Typography>{selectedCourse.instructor}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewOpen(false)} disabled={loading}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <EditCourseForm
              course={selectedCourse}
              onClose={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </DialogContentText>
          {courseToDelete && (
            <Typography>
              You are about to delete: <strong>{courseToDelete.title}</strong>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;
