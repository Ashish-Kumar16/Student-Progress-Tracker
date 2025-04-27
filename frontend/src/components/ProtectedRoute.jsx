import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = localStorage.getItem("token");

  // Check if user is authenticated (either via Redux or token in localStorage)
  const isAuthenticated = isLoggedIn || !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
