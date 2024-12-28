import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;