
import { Container, Box } from '@mui/material';
import Dashboard from "@/components/Dashboard";
import StudentList from "@/components/StudentList";
import AttendanceTracker from "@/components/AttendanceTracker";

const Index = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Dashboard />
        <AttendanceTracker />
        <StudentList />
      </Container>
    </Box>
  );
};

export default Index;
