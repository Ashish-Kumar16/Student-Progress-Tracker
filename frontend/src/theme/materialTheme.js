import { createTheme } from "@mui/material/styles";

// Create a custom Material UI theme
const theme = createTheme({
  palette: {
    mode: "light", // Default to light mode
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
      contrastText: "hsl(210, 40%, 98%)", // --primary-foreground
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
      main: "hsl(210, 40%, 96.1%)", // --accent
      contrastText: "hsl(222.2, 47.4%, 11.2%)", // --accent-foreground
    },
    text: {
      primary: "hsl(222.2, 84%, 4.9%)", // --foreground
      secondary: "hsl(215.4, 16.3%, 46.9%)", // --muted-foreground
      disabled: "hsl(215.4, 16.3%, 46.9%)", // --muted-foreground (for disabled text)
    },
    background: {
      default: "hsl(0, 0%, 100%)", // --background
      paper: "hsl(0, 0%, 100%)", // --card
    },
    divider: "hsl(214.3, 31.8%, 91.4%)", // --border
    action: {
      active: "hsl(222.2, 84%, 4.9%)", // --ring
      hover: "hsl(210, 40%, 96.1%)", // --secondary
      selected: "hsl(210, 40%, 96.1%)", // --accent
      disabled: "hsl(214.3, 31.8%, 91.4%)", // --input
      disabledBackground: "hsl(210, 40%, 96.1%)", // --muted
    },
    // Sidebar-specific colors
    sidebar: {
      background: "hsl(0, 0%, 98%)", // --sidebar-background
      foreground: "hsl(240, 5.3%, 26.1%)", // --sidebar-foreground
      primary: "hsl(240, 5.9%, 10%)", // --sidebar-primary
      primaryForeground: "hsl(0, 0%, 98%)", // --sidebar-primary-foreground
      accent: "hsl(240, 4.8%, 95.9%)", // --sidebar-accent
      accentForeground: "hsl(240, 5.9%, 10%)", // --sidebar-accent-foreground
      border: "hsl(220, 13%, 91%)", // --sidebar-border
      ring: "hsl(217.2, 91.2%, 59.8%)", // --sidebar-ring
    },
    // Dark mode palette
    dark: {
      primary: {
        main: "hsl(210, 40%, 98%)", // --primary (dark)
        contrastText: "hsl(222.2, 47.4%, 11.2%)", // --primary-foreground (dark)
      },
      secondary: {
        main: "hsl(217.2, 32.6%, 17.5%)", // --secondary (dark)
        contrastText: "hsl(210, 40%, 98%)", // --secondary-foreground (dark)
      },
      success: {
        main: "hsl(217.2, 91.2%, 59.8%)", // --sidebar-ring (dark)
        contrastText: "hsl(210, 40%, 98%)",
      },
      error: {
        main: "hsl(0, 62.8%, 30.6%)", // --destructive (dark)
        contrastText: "hsl(210, 40%, 98%)", // --destructive-foreground (dark)
      },
      warning: {
        main: "hsl(224.3, 76.3%, 48%)", // --sidebar-primary (dark)
        contrastText: "hsl(0, 0%, 100%)", // --sidebar-primary-foreground (dark)
      },
      info: {
        main: "hsl(217.2, 32.6%, 17.5%)", // --accent (dark)
        contrastText: "hsl(210, 40%, 98%)", // --accent-foreground (dark)
      },
      text: {
        primary: "hsl(210, 40%, 98%)", // --foreground (dark)
        secondary: "hsl(215, 20.2%, 65.1%)", // --muted-foreground (dark)
        disabled: "hsl(215, 20.2%, 65.1%)", // --muted-foreground (dark)
      },
      background: {
        default: "hsl(222.2, 84%, 4.9%)", // --background (dark)
        paper: "hsl(222.2, 84%, 4.9%)", // --card (dark)
      },
      divider: "hsl(217.2, 32.6%, 17.5%)", // --border (dark)
      action: {
        active: "hsl(212.7, 26.8%, 83.9%)", // --ring (dark)
        hover: "hsl(217.2, 32.6%, 17.5%)", // --secondary (dark)
        selected: "hsl(217.2, 32.6%, 17.5%)", // --accent (dark)
        disabled: "hsl(217.2, 32.6%, 17.5%)", // --input (dark)
        disabledBackground: "hsl(217.2, 32.6%, 17.5%)", // --muted (dark)
      },
      sidebar: {
        background: "hsl(240, 5.9%, 10%)", // --sidebar-background (dark)
        foreground: "hsl(240, 4.8%, 95.9%)", // --sidebar-foreground (dark)
        primary: "hsl(224.3, 76.3%, 48%)", // --sidebar-primary (dark)
        primaryForeground: "hsl(0, 0%, 100%)", // --sidebar-primary-foreground (dark)
        accent: "hsl(240, 3.7%, 15.9%)", // --sidebar-accent (dark)
        accentForeground: "hsl(240, 4.8%, 95.9%)", // --sidebar-accent-foreground (dark)
        border: "hsl(240, 3.7%, 15.9%)", // --sidebar-border (dark)
        ring: "hsl(217.2, 91.2%, 59.8%)", // --sidebar-ring (dark)
      },
    },
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
    borderRadius: 8, // Matches --radius: 0.5rem (8px)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8, // Consistent with --radius
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(0, 0%, 100%)", // --card
          color: "hsl(222.2, 84%, 4.9%)", // --card-foreground
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: 8, // Consistent with --radius
          border: "1px solid hsl(214.3, 31.8%, 91.4%)", // --border
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "hsl(0, 0%, 100%)", // --popover
          color: "hsl(222.2, 84%, 4.9%)", // --popover-foreground
          border: "1px solid hsl(214.3, 31.8%, 91.4%)", // --border
          borderRadius: 8, // Consistent with --radius
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "hsl(0, 0%, 98%)", // --sidebar-background
          color: "hsl(240, 5.3%, 26.1%)", // --sidebar-foreground
          borderBottom: "1px solid hsl(220, 13%, 91%)", // --sidebar-border
        },
        body: {
          color: "hsl(222.2, 84%, 4.9%)", // --foreground
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: "hsl(214.3, 31.8%, 91.4%)", // --input
          "&:hover": {
            borderColor: "hsl(222.2, 84%, 4.9%)", // --ring
          },
        },
      },
    },
    // Dark mode overrides for components
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          // Apply dark mode styles when mode is dark
          [theme.breakpoints.up("xs")]: {
            ...(theme.palette.mode === "dark" && {
              backgroundColor: "hsl(222.2, 84%, 4.9%)", // --background (dark)
              color: "hsl(210, 40%, 98%)", // --foreground (dark)
            }),
          },
        },
        // Dark mode for cards
        ".MuiCard-root": {
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "hsl(222.2, 84%, 4.9%)", // --card (dark)
            color: "hsl(210, 40%, 98%)", // --card-foreground (dark)
            border: "1px solid hsl(217.2, 32.6%, 17.5%)", // --border (dark)
          }),
        },
        // Dark mode for popovers
        ".MuiPopover-paper": {
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "hsl(222.2, 84%, 4.9%)", // --popover (dark)
            color: "hsl(210, 40%, 98%)", // --popover-foreground (dark)
            border: "1px solid hsl(217.2, 32.6%, 17.5%)", // --border (dark)
          }),
        },
        // Dark mode for table cells
        ".MuiTableCell-head": {
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "hsl(240, 5.9%, 10%)", // --sidebar-background (dark)
            color: "hsl(240, 4.8%, 95.9%)", // --sidebar-foreground (dark)
            borderBottom: "1px solid hsl(240, 3.7%, 15.9%)", // --sidebar-border (dark)
          }),
        },
        ".MuiTableCell-body": {
          ...(theme.palette.mode === "dark" && {
            color: "hsl(210, 40%, 98%)", // --foreground (dark)
          }),
        },
        // Dark mode for inputs
        ".MuiInputBase-root": {
          ...(theme.palette.mode === "dark" && {
            borderColor: "hsl(217.2, 32.6%, 17.5%)", // --input (dark)
            "&:hover": {
              borderColor: "hsl(212.7, 26.8%, 83.9%)", // --ring (dark)
            },
          }),
        },
      }),
    },
  },
});

export default theme;
