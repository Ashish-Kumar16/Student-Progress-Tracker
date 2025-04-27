// src/pages/Students.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, MoreVertical, Eye, Trash2 } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useToast } from "@/context/ToastContext"; // Import the ToastContext

// Import Redux actions and selectors
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  selectStudents,
  selectSelectedStudent,
  selectLoading,
  selectError,
  fetchStudentById,
} from "@/store/slices/studentsSlice";
import { fetchCourses, selectCourses } from "../store/slices/coursesSlice";
import {
  fetchSubmissions,
  selectSubmissions,
} from "../store/slices/submissionSlice";
import { fetchGrades, selectGrades } from "../store/slices/gradesSlice";

// Import form components (assumed to exist)
import AddStudentForm from "@/components/forms/AddStudentForm";
import EditStudentForm from "@/components/forms/EditStudentForm";

const Students = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showToast } = useToast(); // Use the ToastContext

  // Selectors
  const students = useSelector(selectStudents);
  const courses = useSelector(selectCourses);
  const submissions = useSelector(selectSubmissions);
  const grades = useSelector(selectGrades);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedStudent = useSelector(selectSelectedStudent);

  // State
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
    dispatch(fetchSubmissions());
    dispatch(fetchGrades());
  }, [dispatch]);

  useEffect(() => {
    console.log("Courses Array:", courses); // Debugging
  }, [courses]);

  // Handle error toasts
  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuRow(null);
  };

  const handleDelete = () => {
    dispatch(deleteStudent(menuRow._id))
      .unwrap()
      .then(() => {
        showToast("Student deleted successfully", "success");
        setOpenDelete(false);
        handleMenuClose();
      })
      .catch((err) => {
        showToast(err.message || "Failed to delete student", "error");
      });
  };

  const getCourseCodes = (coursesArr = []) => {
    if (!coursesArr.length) return "No courses assigned";
    if (typeof coursesArr[0] === "object" && coursesArr[0] !== null) {
      return coursesArr.map((c) => c.title || "Unknown Course").join(", ");
    }
    return coursesArr
      .map((id) => courses.find((c) => c._id === id)?.title || "Unknown Course")
      .join(", ");
  };

  const getStudentSubmissions = (studentId) =>
    submissions.filter((sub) => sub.studentId === studentId).length;

  const getStudentGrade = (studentId) => {
    const studentGrades = grades.filter((g) => g.studentId === studentId);
    if (!studentGrades.length) return 0;
    const average =
      studentGrades.reduce((sum, g) => sum + g.score, 0) / studentGrades.length;
    return Math.round(average);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "attendance",
      headerName: "Attendance",
      flex: 0.5,
      renderCell: ({ row }) =>
        row.attendance != null ? `${row.attendance}%` : "N/A",
    },
    {
      field: "submissions",
      headerName: "Submissions",
      flex: 0.5,
      renderCell: ({ row }) =>
        row.submissions != null ? row.submissions : "N/A",
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 0.5,
      renderCell: ({ row }) => (row.grade != null ? `${row.grade}%` : "N/A"),
    },
    {
      field: "courses",
      headerName: "Courses",
      flex: 1,
      renderCell: ({ row }) => {
        const value = row.courses;
        if (!Array.isArray(value) || !value.length)
          return "No courses assigned";
        if (typeof value[0] === "object" && value[0] !== null) {
          return value.map((c) => c.title || "Unknown Course").join(", ");
        }
        return value
          .map(
            (id) =>
              courses.find((c) => c._id === id)?.title || "Unknown Course",
          )
          .join(", ");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => {
              setOpenEdit(true);
              dispatch(fetchStudentById(row._id));
            }}
          >
            <Eye size={20} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setMenuRow(row);
              setOpenDelete(true);
            }}
          >
            <Trash2 size={20} />
          </IconButton>
        </Box>
      ),
    },
  ];

  let content;
  if (loading || !courses.length || !students.length) {
    content = (
      <Box>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  } else {
    const rows = students
      .filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase()),
      )
      .map((s) => ({
        ...s,
        id: s._id,
      }));
    console.log("Rows for DataGrid:", rows); // Debugging
    content = (
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
    );
  }
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: theme.spacing(4), mb: theme.spacing(4) }}
    >
      <Card>
        <CardHeader
          title="Students"
          action={
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setOpenAdd(true)}
            >
              Add
            </Button>
          }
        />
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />
          {content}
        </CardContent>
      </Card>

      {/* Add dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <AddStudentForm
            onClose={() => setOpenAdd(false)}
            onSubmit={(studentData) =>
              dispatch(addStudent(studentData))
                .unwrap()
                .then(() => {
                  showToast("Student added successfully", "success");
                  setOpenAdd(false);
                })
                .catch((err) =>
                  showToast(err.message || "Failed to add student", "error"),
                )
            }
          />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {selectedStudent ? (
            <EditStudentForm
              student={selectedStudent}
              onClose={() => setOpenEdit(false)}
              onSubmit={(studentData) =>
                dispatch(
                  updateStudent({ id: selectedStudent._id, studentData }),
                )
                  .unwrap()
                  .then(() => {
                    showToast("Student updated successfully", "success");
                    setOpenEdit(false);
                  })
                  .catch((err) =>
                    showToast(
                      err.message || "Failed to update student",
                      "error",
                    ),
                  )
              }
            />
          ) : (
            <Typography>Loading student data...</Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContentText sx={{ p: 3 }}>
          Are you sure you want to delete this student? This cannot be undone.
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Students;
