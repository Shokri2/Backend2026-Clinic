import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function AdminRoute() {
  const { currentUser } = useContext(UserContext);

  // إذا مش مسجل دخول
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // إذا مش Admin
  if (currentUser.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Admin
  return <Outlet />;
}
