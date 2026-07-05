import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
export const useAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const register = async (formData) => {
    // formData = {name, email, pas, confipass}
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast.error("please fill all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("password should match");
        return;
      }
      const res = await api.post("/auth/register", formData);
      console.log("res in register: ", res);
      toast.success(res.data.message || "Account Created!");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  const login = async (formData) => {
    try {
      if (!formData.email || !formData.password) {
        toast.error("please fill all fields");
        return;
      }
      console.log(formData);
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
      }
      setCurrentUser(user);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const logout = async () => {
    try {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      toast.success("Logout Done");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return { register, login, logout };
};
