/**
 * Application Routes
 *
 * Route structure:
 * - /signin: Public login page
 * - / (root): Protected area - requires authentication
 *   - /: Dashboard (Home)
 *   - /users: User list with CRUD operations via modals
 *   - /users/:userId: Edit specific user
 *
 * Security:
 * - ProtectedRoute wraps all authenticated routes, redirecting to /signin if not logged in
 * - ErrorBoundary catches rendering errors and displays a friendly error page
 *
 * Note: /users/new redirects to /users because user creation is handled via modal,
 * not a separate page.
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../layout";
import Home from "../pages/Home";
import Users from "../pages/Users";
import UserEdit from "../pages/UserEdit";
import SignIn from "../pages/SignIn";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route: Sign-in page */}
        <Route path="/signin" element={<SignIn />} errorElement={<ErrorBoundary />} />

        {/* Protected routes: Require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/new" element={<Navigate to="/users" replace />} />
          <Route path="users/:userId" element={<UserEdit />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
