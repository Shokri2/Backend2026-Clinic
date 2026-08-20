import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  // =====================================================
  // REGISTER
  // =====================================================

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

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (formData) => {
    try {
      // Validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      // API LOGIN
      const res = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const { user, token } = res.data;

      if (!user || !token) {
        toast.error("Invalid login response from server");
        return;
      }

      console.log("USER ROLE:", user.role);
      console.log("USER:", user);

      // =================================================
      // SAVE LOGIN DATA
      // =================================================

      localStorage.setItem("token", token);

      localStorage.setItem("currentUser", JSON.stringify(user));

      // مهم:
      // DoctorDashboard عندك كان يقرأ user من localStorage
      // لذلك نخزن الاثنين حتى ما يصير تعارض.
      localStorage.setItem("user", JSON.stringify(user));

      // Update Context
      setCurrentUser(user);

      toast.success(res.data.message || "Login Successfully");

      // =================================================
      // ROLE REDIRECT
      // =================================================

      if (user.role === "doctor") {
        console.log("REDIRECTING TO DOCTOR DASHBOARD");

        navigate("/doctor/dashboard", {
          replace: true,
        });

        return;
      }

      if (user.role === "user") {
        console.log("REDIRECTING TO USER DASHBOARD");

        navigate("/user/dashboard", {
          replace: true,
        });

        return;
      }

      if (user.role === "admin") {
        console.log("REDIRECTING TO ADMIN DASHBOARD");

        navigate("/admin/dashboard", {
          replace: true,
        });

        return;
      }

      if (user.role === "employee") {
        console.log("REDIRECTING TO EMPLOYEE DASHBOARD");

        navigate("/employee/dashboard", {
          replace: true,
        });

        return;
      }

      // إذا وصلنا لهون يعني الـ role غير معروف
      console.error("INVALID ROLE:", user.role);

      toast.error(`Invalid role: ${user.role}`);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user");

      setCurrentUser(null);

      toast.success("Logout Done");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      toast.error("Logout failed");
    }
  };

  return {
    register,
    login,
    logout,
  };
};
