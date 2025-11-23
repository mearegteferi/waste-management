import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  // 1. Not Logged In -> Go to Login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 2. Logged In but Pending -> Go to Activation
  if (status === "PENDING") {
    return <Navigate to="/activation" replace />;
  }

  // 3. Authorized -> Render the child routes (The Dashboard, etc.)
  return <Outlet />;
};

export default ProtectedRoute;