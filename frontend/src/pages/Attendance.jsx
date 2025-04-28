/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Skeleton,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { mockAttendance, mockStudents, mockCourses } from "@/data/mockData";
import { useToast } from "@/context/ToastContext"; // Import useToast from ToastContext

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const { showToast } = useToast();

  // Initialize attendance status from mock data when date or course changes
  const updateAttendanceStatus = useCallback(() => {
    if (!selectedDate || !selectedCourse) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const newStatus = {};

    // Get students for this course
    const courseStudents = mockStudents.filter((student) =>
      student.courses.includes(selectedCourse),
    );

    // Set default status
    courseStudents.forEach((student) => {
      newStatus[student.id] = "absent";
    });

    // Update with actual attendance data
    mockAttendance
      .filter((a) => a.date === dateStr && a.courseId === selectedCourse)
      .forEach((record) => {
        newStatus[record.studentId] = record.status;
      });

    setAttendanceStatus(newStatus);
  }, [selectedDate, selectedCourse]);

  // Effect to update attendance status
  useEffect(() => {
    if (selectedDate && selectedCourse) {
      updateAttendanceStatus();
    }
  }, [selectedDate, selectedCourse, updateAttendanceStatus]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = () => {
    console.log("Saving attendance:", {
      date: format(selectedDate, "yyyy-MM-dd"),
      course: selectedCourse,
      attendanceStatus,
    });
    showToast("Attendance saved successfully!", "success"); // Use showToast
  };

  // Get students for the selected course
  const courseStudents = selectedCourse
    ? mockStudents.filter((student) => student.courses.includes(selectedCourse))
    : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Attendance Tracker
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Selection
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="course-select-label">
                  Select a course
                </InputLabel>
                <Select
                  labelId="course-select-label"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Select a course"
                >
                  {mockCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedCourse && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {courseStudents.length} students enrolled
                </Typography>
              )}

              {selectedDate && selectedCourse && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleSaveAttendance}
                >
                  Save Attendance
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {selectedDate && selectedCourse && (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? [...Array(5)].map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Skeleton variant="text" width={120} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width={180} />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              variant="rectangular"
                              width={80}
                              height={32}
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              variant="rectangular"
                              width={200}
                              height={36}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : courseStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            {attendanceStatus[student.id] === "present" && (
                              <Chip label="Present" color="success" />
                            )}
                            {attendanceStatus[student.id] === "absent" && (
                              <Chip label="Absent" color="error" />
                            )}
                            {attendanceStatus[student.id] === "late" && (
                              <Chip label="Late" color="warning" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                size="small"
                                variant={
                                  attendanceStatus[student.id] === "present"
                                    ? "contained"
                                    : "outlined"
                                }
                                color="success"
                                onClick={() =>
                                  handleStatusChange(student.id, "present")
                                }
                              >
                                Present
                              </Button>
                              <Button
                                size="small"
                                variant={
                                  attendanceStatus[student.id] === "late"
                                    ? "contained"
                                    : "outlined"
                                }
                                color="warning"
                                onClick={() =>
                                  handleStatusChange(student.id, "late")
                                }
                              >
                                Late
                              </Button>
                              <Button
                                size="small"
                                variant={
                                  attendanceStatus[student.id] === "absent"
                                    ? "contained"
                                    : "outlined"
                                }
                                color="error"
                                onClick={() =>
                                  handleStatusChange(student.id, "absent")
                                }
                              >
                                Absent
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Attendance;
