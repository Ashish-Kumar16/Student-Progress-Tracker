import { createTheme } from "@mui/material/styles";

// Create a custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(222.2, 47.4%, 11.2%)", // --primary
      contrastText: "hsl(210, 40%, 98%)", // --primary-foreground
    },
    secondary: {
      main: "hsl(210, 40%, 96.1%)", // --secondary
      contrastText: "hsl(222.2, 47.4%, 11.2%)", // --secondary-foreground
    },
    success: {
      main: "hsl(217.2, 91.2%, 59.8%)", // --sidebar-ring
      contrastText: "hsl(210, 40%, 98%)",
    },
    error: {
      main: "hsl(0, 84.2%, 60.2%)", // --destructive
      contrastText: "hsl(210, 40%, 98%)", // --destructive-foreground
    },
    warning: {
      main: "hsl(240, 5.9%, 10%)", // --sidebar-primary
      contrastText: "hsl(0, 0%, 98%)", // --sidebar-primary-foreground
    },
    info: {
      main: "hsl(217.2, 32.6%, 17.5%)", // --muted
      contrastText: "hsl(210, 40%, 98%)", // --muted-foreground
    },
    text: {
      primary: "hsl(222.2, 84%, 4.9%)", // --foreground
      secondary: "hsl(215.4, 16.3%, 46.9%)", // --muted-foreground
      disabled: "hsl(214.3, 31.8%, 91.4%)", // --input
    },
    background: {
      default: "hsl(0, 0%, 100%)", // --background
      paper: "hsl(0, 0%, 98%)", // --sidebar-background
    },
    divider: "hsl(214.3, 31.8%, 91.4%)", // --border
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Matches --radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "hsl(0, 0%, 98%)", // --sidebar-background
        },
      },
    },
  },
});

export default theme;
