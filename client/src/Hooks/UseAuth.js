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

      console.log("Register response:", res.data);

      toast.success(res.data.message || "Account Created!");

      // بعد التسجيل يروح لصفحة Login
      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);

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

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      console.log(user.role);

      toast.success(res.data.message || "Login Successfully");

      if (user.role === "user") {
        navigate("/home");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "employee") {
        navigate("/employee/dashboard");
      }

      setCurrentUser(user);
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);

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
      console.log("LOGOUT ERROR:", error);

      toast.error("Logout failed");
    }
  };

  return {
    register,
    login,
    logout,
  };
};
