import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
} from "recharts";
import {
  mockStudents,
  mockAttendance,
  mockSubmissions,
  mockCourses,
} from "@/data/mockData";

const Dashboard = () => {
  const theme = useTheme();

  const todayCount = mockAttendance.filter(
    (a) => a.status === "present",
  ).length;
  const totalStudents = mockStudents.length;
  const attendanceRate = (todayCount / totalStudents) * 100;
  const avgGrade =
    mockStudents.reduce((sum, s) => sum + s.grade, 0) / totalStudents;
  const totalCourses = mockCourses.length;

  const perfData = mockStudents.map((s) => ({
    name: s.name.split(" ")[0],
    Attendance: s.attendance,
    Grade: s.grade,
  }));

  const statusData = [
    {
      name: "Graded",
      value: mockSubmissions.filter((s) => s.status === "graded").length,
    },
    {
      name: "Submitted",
      value: mockSubmissions.filter((s) => s.status === "submitted").length,
    },
    {
      name: "Late",
      value: mockSubmissions.filter((s) => s.status === "late").length,
    },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight={700} align="center">
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
        {[
          {
            label: "Students",
            value: totalStudents,
            subtitle: "Total enrolled",
            color: theme.palette.primary.main,
          },
          {
            label: "Today's Attendance",
            value: `${attendanceRate.toFixed(1)}%`,
            subtitle: `${todayCount} of ${totalStudents} present`,
            color: theme.palette.primary.main,
          },
          {
            label: "Average Grade",
            value: `${avgGrade.toFixed(1)}%`,
            subtitle: "Class average",
            color: theme.palette.success.main,
          },
          {
            label: "Courses",
            value: totalCourses,
            subtitle: "Active courses",
            color: theme.palette.secondary.main,
          },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ mt: 1, color: card.color, textAlign: "center" }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 1 }}>
            <CardHeader title="Student Performance" />
            <CardContent sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={perfData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Bar dataKey="Attendance" fill={theme.palette.primary.main} />
                  <Bar dataKey="Grade" fill={theme.palette.secondary.main} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 1 }}>
            <CardHeader title="Submission Status" />
            <CardContent
              sx={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <PieTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
