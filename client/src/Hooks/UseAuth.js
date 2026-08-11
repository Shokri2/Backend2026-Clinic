import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  // Register
  const register = async (formData) => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast.error("Please fill all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password should match");
        return;
      }

      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message || "Account Created!");

      // بعد التسجيل ينتقل إلى صفحة Login
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  // Login
  const login = async (formData) => {
    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      const res = await api.post("/auth/login", formData);

      const { user, token } = res.data;
      console.log("USER ROLE:", user.role);
      console.log("USER:", user);
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      toast.success(res.data.message || "Login Successfully");

      // تحديد الصفحة حسب صلاحية المستخدم
      if (user.role === "user") {
        navigate("/user/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "employee") {
        navigate("/employee/dashboard");
      }

      setCurrentUser(user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");

      setCurrentUser(null);

      toast.success("Logout Done");

      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return {
    register,
    login,
    logout,
  };
};
