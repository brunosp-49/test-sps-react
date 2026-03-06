/**
 * ProtectedRoute - Guards routes that require authentication.
 *
 * How it works:
 * - Checks Redux auth state (which is rehydrated from localStorage on app load)
 * - If not authenticated, redirects to /signin with the original location saved
 *   in state, allowing redirect back after successful login
 * - If authenticated, renders the children (protected content)
 *
 * Usage: Wrap any Route element that should only be accessible to logged-in users.
 */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store";
import { selectIsAuthenticated } from "../../store/authSlice";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Save current location so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
