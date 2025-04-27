import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  Award,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useToast } from "../context/ToastContext"; // <-- Add this import

export const drawerWidth = 240;

const sidebarItems = [
  { title: "Dashboard", icon: BarChart2, to: "/" },
  { title: "Students", icon: Users, to: "/students" },
  { title: "Courses", icon: Book, to: "/courses" },
  { title: "Attendance", icon: Calendar, to: "/attendance" },
  { title: "Assignments", icon: FileText, to: "/assignments" },
  { title: "Grades", icon: Award, to: "/grades" },
  { title: "Reports", icon: BarChart2, to: "/reports" },
  { title: "Settings", icon: Settings, to: "/settings" },
];

const AppSidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast(); // <-- Add this line

  if (isMobile) {
    return null; // No sidebar for mobile; handled by BottomNavigation component
  }

  const handleLogout = () => {
    dispatch(logout());
    toast("Logged out successfully", { type: "success" }); // <-- Show toast
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Student Tracker
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item.title} title={item.title} placement="right">
              <ListItem
                button
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AppSidebar;
