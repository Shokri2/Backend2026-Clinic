import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { currentUser } = useContext(UserContext);

  // المستخدم غير مسجل دخول
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // المستخدم مسجل لكن ليس لديه الصلاحية
  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (currentUser.role === "employee") {
      return <Navigate to="/employee/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
}
