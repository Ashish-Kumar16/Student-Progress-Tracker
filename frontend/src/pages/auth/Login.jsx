import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoading } from "../../store/slices/authSlice";
import { useToast } from "@/context/ToastContext"; // Import useToast

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { showToast } = useToast(); // Use the toast context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      showToast("Please fill in all fields", "error"); // Use showToast for errors
      return;
    }

    try {
      await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();
      showToast("Logged in successfully!", "success"); // Use showToast for success
      navigate("/");
    } catch (error) {
      showToast(error?.message || "Failed to log in", "error"); // Use showToast for errors
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ maxWidth: 400, padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Student Progress Tracker
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Sign in to your account
          </Typography>

          <div style={{ marginTop: "20px" }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
