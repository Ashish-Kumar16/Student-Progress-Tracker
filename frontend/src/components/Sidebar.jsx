import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  Award,
  FileText,
  BarChart2,
  Settings,
  LogIn,
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
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const drawerWidth = 240;

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart2,
    to: "/",
  },
  {
    title: "Students",
    icon: Users,
    to: "/students",
  },
  {
    title: "Courses",
    icon: Book,
    to: "/courses",
  },
  {
    title: "Attendance",
    icon: Calendar,
    to: "/attendance",
  },
  {
    title: "Assignments",
    icon: FileText,
    to: "/assignments",
  },
  {
    title: "Grades",
    icon: Award,
    to: "/grades",
  },
  {
    title: "Reports",
    icon: BarChart2,
    to: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile and tablet views
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(location.pathname);

  if (isMobile) {
    // Bottom Navigation for mobile and tablet views
    return (
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200 }}
      >
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => setBottomNavValue(newValue)}
          showLabels
        >
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <BottomNavigationAction
                key={item.title}
                // label={item.title}
                icon={<Icon size={20} />}
                component={Link}
                to={item.to}
                value={item.to}
              />
            );
          })}
        </BottomNavigation>
      </Box>
    );
  }

  // Drawer for desktop views
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
        {!isLoggedIn ? (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            fullWidth
            startIcon={<LogIn size={16} />}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default AppSidebar;
