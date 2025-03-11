import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.usuario.isLoggedIn);

  if (!isLoggedIn) {
    // Redirigir al usuario a la página de login y preservar la ruta a la que intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
