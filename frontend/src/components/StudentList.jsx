import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  fetchStudents,
  selectStudents,
  selectLoading,
  selectError,
} from "@/store/slices/studentsSlice";

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Fetch students on mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!students.length) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Students
        </Typography>
        <Typography color="text.disabled">No students found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Students
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Submissions</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      student.attendance ? `${student.attendance}%` : "N/A"
                    }
                    color={
                      student.attendance > 80
                        ? "success"
                        : student.attendance > 60
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{student.submissions?.length || 0}</TableCell>
                <TableCell>
                  <Chip
                    label={student.grade ? `${student.grade}%` : "N/A"}
                    color={
                      student.grade > 80
                        ? "success"
                        : student.grade > 60
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {student.courses?.map((course) => course.code).join(", ") ||
                    "None"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentList;
