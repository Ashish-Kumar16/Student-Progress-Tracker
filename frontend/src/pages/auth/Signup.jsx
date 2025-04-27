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
import { signup, selectLoading } from "../../store/slices/authSlice";
import { useToast } from "@/context/ToastContext"; // Import useToast

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name || !formData.email || !formData.password) {
      showToast("Please fill in all fields", "error"); // Use showToast for errors
      return;
    }

    try {
      await dispatch(
        signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();
      showToast("Signed up successfully!", "success"); // Use showToast for success
      navigate("/");
    } catch (error) {
      showToast(error?.message || "Failed to sign up", "error"); // Use showToast for errors
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
            Create a new account
          </Typography>

          <div style={{ marginTop: "20px" }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
            />
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
                "Sign up"
              )}
            </Button>
          </div>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
