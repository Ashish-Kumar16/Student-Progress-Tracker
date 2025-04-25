import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  setSelectedCourse,
  deleteCourse,
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
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import AddCourseForm from "../components/forms/AddCourseForm";
import EditCourseForm from "../components/forms/EditCourseForm";
import { mockStudents } from "@/data/mockData";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourseState] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Filter courses based on search input
  const filteredCourses = (courses || []).filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase()),
  );

  // Map student IDs to names using mock data
  const getStudentsForCourse = (studentIds = []) => {
    return studentIds.map((id) => {
      const student = mockStudents.find((s) => s.id === id);
      return student ? student.name : "Unknown";
    });
  };

  // Handle course deletion
  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
    setIsDeleteOpen(false);
    toast.success("Course deleted successfully");
  };

  // Open dialog functions
  const openViewDialog = (course) => {
    setSelectedCourseState(course);
    dispatch(setSelectedCourse(course));
    setIsViewOpen(true);
  };

  const openEditDialog = (course) => {
    setSelectedCourseState(course);
    dispatch(setSelectedCourse(course));
    setIsEditOpen(true);
  };

  const openDeleteDialog = (course) => {
    setSelectedCourseState(course);
    dispatch(setSelectedCourse(course));
    setIsDeleteOpen(true);
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
        />
      </Paper>

      {/* Courses table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Students</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {course.code}
                  </TableCell>
                  <TableCell>{course.name}</TableCell>
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
                  <TableCell>
                    <Chip label={course.students?.length || 0} size="small" />{" "}
                    enrolled
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Eye size={16} />}
                      onClick={() => openViewDialog(course)}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit size={16} />}
                      onClick={() => openEditDialog(course)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<Trash2 size={16} />}
                      onClick={() => openDeleteDialog(course)}
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
                    Course Code
                  </Typography>
                  <Typography>{selectedCourse.code}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography>{selectedCourse.name}</Typography>
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
                  Students Enrolled ({selectedCourse?.students?.length || 0})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {getStudentsForCourse(selectedCourse?.students || []).map(
                    (name, index) => (
                      <Chip
                        key={index}
                        label={name}
                        variant="outlined"
                        size="small"
                      />
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewOpen(false)}>Close</Button>
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
          {selectedCourse && (
            <Typography>
              You are about to delete:{" "}
              <strong>
                {selectedCourse.name} ({selectedCourse.code})
              </strong>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(selectedCourse.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;
