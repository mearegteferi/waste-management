import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const authState = useSelector(state => state.auth.isAuthenticated); 
  return authState ? children : <Navigate to="/login" />;
};


export default ProtectedRoute;
