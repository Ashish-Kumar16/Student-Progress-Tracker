import React from "react";
import { Typography } from "@mui/material";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error" variant="h6">
          Something went wrong. Please try again later.
        </Typography>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
