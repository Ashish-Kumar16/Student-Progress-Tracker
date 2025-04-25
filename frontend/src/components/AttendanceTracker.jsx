
import { useState } from "react";
import { 
  Box, Card, CardContent, Grid, Typography, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { mockAttendance, mockStudents } from "@/data/mockData";

const AttendanceTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getAttendanceForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mockAttendance.filter(a => a.date === dateStr);
  };

  const presentCount = selectedDate 
    ? getAttendanceForDate(selectedDate).filter(a => a.status === "present").length
    : 0;

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Attendance Tracker
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar 
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Summary
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Present
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {presentCount}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Absent
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {mockStudents.length - presentCount}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="h4">
                    {mockStudents.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceTracker;
