import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function AdminRoute() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
}
