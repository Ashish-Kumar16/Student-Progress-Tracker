/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Download, FileType } from "lucide-react";
import { mockStudents, mockCourses } from "@/data/mockData";
import { useToast } from "@/context/ToastContext"; // Import useToast

const Reports = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [reportType, setReportType] = useState("attendance");

  const { showToast } = useToast(); // Use the toast context

  const handleGenerateReport = (format) => {
    console.log("Generating report:", {
      reportType,
      startDate,
      endDate,
      selectedStudents,
      selectedCourse,
      format,
    });
    showToast(
      `${format.toUpperCase()} report generated successfully!`,
      "success",
    ); // Use showToast
  };

  const filteredStudents =
    selectedCourse !== "all"
      ? mockStudents.filter((s) => s.courses.includes(selectedCourse))
      : mockStudents;

  const handleTabChange = (_, newValue) => setReportType(newValue);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>

      <Grid container spacing={3}>
        {/* Parameters */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Parameters
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Tabs
                  value={reportType}
                  onChange={handleTabChange}
                  variant="fullWidth"
                >
                  <Tab label="Attendance" value="attendance" />
                  <Tab label="Grades" value="grades" />
                  <Tab label="Progress" value="progress" />
                </Tabs>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Date Range
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    value={selectedCourse}
                    label="Course"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <MenuItem value="all">All Courses</MenuItem>
                    {mockCourses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="student-select-label">Students</InputLabel>
                  <Select
                    labelId="student-select-label"
                    value={selectedStudents[0] || "all"}
                    label="Students"
                    onChange={(e) => setSelectedStudents([e.target.value])}
                  >
                    <MenuItem value="all">All Students</MenuItem>
                    {filteredStudents.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<FileType size={16} />}
                    onClick={() => handleGenerateReport("pdf")}
                    disabled={!startDate || !endDate}
                  >
                    PDF
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Download size={16} />}
                    onClick={() => handleGenerateReport("csv")}
                    disabled={!startDate || !endDate}
                  >
                    CSV
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Preview
              </Typography>

              <Box sx={{ mt: 2 }}>
                {reportType === "attendance" && (
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Student</TableCell>
                          <TableCell>Present</TableCell>
                          <TableCell>Absent</TableCell>
                          <TableCell>Late</TableCell>
                          <TableCell>Rate</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredStudents.slice(0, 4).map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>{s.attendance}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {reportType === "grades" && (
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Student</TableCell>
                          <TableCell>Assignments</TableCell>
                          <TableCell>Avg. Grade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredStudents.slice(0, 4).map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.submissions} completed</TableCell>
                            <TableCell>{s.grade}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {reportType === "progress" && (
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Student</TableCell>
                          <TableCell>Attendance</TableCell>
                          <TableCell>Submissions</TableCell>
                          <TableCell>Grade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredStudents.slice(0, 4).map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.attendance}%</TableCell>
                            <TableCell>{s.submissions}</TableCell>
                            <TableCell>{s.grade}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  Preview only. Generate report for complete data.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
