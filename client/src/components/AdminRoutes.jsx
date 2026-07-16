import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Login pannala
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin illa
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin
  return <Outlet />;
};

export default AdminRoute;
