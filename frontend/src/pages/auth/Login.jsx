import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { toast } from "sonner"; // You may want to replace this with MUI's Snackbar

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (
        formData.email === "admin@example.com" &&
        formData.password === "password"
      ) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f9fafb"
      px={2}
      py={6}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 3 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Student Progress Tracker
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mt={1}>
              Sign in to your account
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mb={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2" fontWeight="medium">
                  Password
                </Typography>
                <Button variant="text" size="small">
                  Forgot password?
                </Button>
              </Box>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="password"
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            <Box mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mb: 2 }}
              startIcon={isLoading && <CircularProgress size={18} />}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Box textAlign="center" mt={1}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#1976d2", fontWeight: 500 }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
          <Box mt={4} textAlign="center">
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              For demo purposes use:
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Email: admin@example.com
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              Password: password
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
