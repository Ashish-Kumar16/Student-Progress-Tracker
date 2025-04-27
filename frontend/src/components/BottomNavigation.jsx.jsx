import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  Award,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const navigationItems = [
  { title: "Dashboard", icon: BarChart2, to: "/" },
  { title: "Students", icon: Users, to: "/students" },
  { title: "Courses", icon: Book, to: "/courses" },
  { title: "Attendance", icon: Calendar, to: "/attendance" },
  { title: "Assignments", icon: FileText, to: "/assignments" },
  { title: "Grades", icon: Award, to: "/grades" },
  { title: "Reports", icon: BarChart2, to: "/reports" },
  { title: "Settings", icon: Settings, to: "/settings" },
];

const BottomNavigationComponent = () => {
  const location = useLocation();
  const theme = useTheme();
  const [bottomNavValue, setBottomNavValue] = useState(location.pathname);

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  return (
    <BottomNavigation
      value={bottomNavValue}
      onChange={handleBottomNavChange}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <BottomNavigationAction
            key={item.title}
            label={item.title}
            icon={<Icon size={16} />}
            value={item.to}
            component={Link}
            to={item.to}
            sx={{ minWidth: "auto", padding: "0 8px" }}
          />
        );
      })}
    </BottomNavigation>
  );
};

export default BottomNavigationComponent;
