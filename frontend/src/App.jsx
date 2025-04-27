import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
// import { TooltipProvider } from "./components/ui/tooltip";
import { ToastProvider } from "./context/ToastContext";
import { useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./store/slices/authSlice";
import ErrorBoundary from "./hooks/ErrorBoundary";
import axios from "axios";

// Pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";

// Components
import AppSidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
const drawerWidth = 240;

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = localStorage.getItem("token");

  // Set token in Axios headers on app initialization
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const isAuthenticated = isLoggedIn || !!token;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <TooltipProvider> */}
        <ToastProvider>
          <BrowserRouter>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              {/* Show Sidebar only for authenticated users and non-mobile */}
              {isAuthenticated && !isMobile && <AppSidebar />}
              <Box
                component="main"
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  marginLeft:
                    isAuthenticated && !isMobile ? `${drawerWidth}px` : 0,
                  padding: "16px",
                  paddingBottom: isMobile && isAuthenticated ? "64px" : "0",
                }}
              >
                <ErrorBoundary>
                  <Routes>
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/attendance" element={<Attendance />} />
                      <Route path="/assignments" element={<Assignments />} />
                      <Route path="/grades" element={<Grades />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Box>
              {/* Show BottomNavigation only for authenticated users on mobile */}
              {isAuthenticated && isMobile && <BottomNavigation />}
            </Box>
          </BrowserRouter>
        </ToastProvider>
        {/* </TooltipProvider> */}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
