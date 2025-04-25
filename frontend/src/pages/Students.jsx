import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
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
import {
  selectStudents,
  setSelectedStudent,
  deleteStudent,
} from "@/store/slices/studentsSlice";
import AddStudentForm from "@/components/forms/AddStudentForm";
import EditStudentForm from "@/components/forms/EditStudentForm";
import { mockCourses } from "@/data/mockData";
import { toast } from "sonner";

const Students = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // simulate load
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setMenuRow(row);
    dispatch(setSelectedStudent(row));
  };
  const handleMenuClose = () => setMenuAnchor(null);

  const handleDelete = () => {
    dispatch(deleteStudent(menuRow.id));
    toast.success("Student deleted");
    setOpenDelete(false);
    handleMenuClose();
  };
  const getCourseCodes = (ids = []) =>
    ids
      .map((id) => mockCourses.find((c) => c.id === id)?.code || "?")
      .join(", ");

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "attendance",
      headerName: "Attendance",
      flex: 0.5,
      valueFormatter: ({ value }) => `${value}%`,
    },
    { field: "submissions", headerName: "Submissions", flex: 0.5 },
    {
      field: "grade",
      headerName: "Grade",
      flex: 0.5,
      valueFormatter: ({ value }) => `${value}%`,
    },
    {
      field: "courses",
      headerName: "Courses",
      flex: 1,
      valueGetter: ({ row }) => getCourseCodes(row?.courses || []),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
          <MoreVertical size={16} />
        </IconButton>
      ),
    },
  ];

  let content;
  if (loading) {
    content = (
      <Box>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  } else if (!students.length) {
    content = (
      <Box textAlign="center" py={8}>
        <Typography color="text.disabled">No students found</Typography>
      </Box>
    );
  } else {
    const rows = students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()),
    );
    content = (
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          getRowId={(row) => row.id}
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

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setOpenEdit(true);
            handleMenuClose();
          }}
        >
          <Eye size={14} /> View/Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDelete(true);
            handleMenuClose();
          }}
        >
          <Trash2 size={14} /> Delete
        </MenuItem>
      </Menu>

      {/* Add dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <AddStudentForm onClose={() => setOpenAdd(false)} />
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
          <EditStudentForm onClose={() => setOpenEdit(false)} />
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
