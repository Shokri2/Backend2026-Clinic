import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import  Register  from "./Components/Auth/Register.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Auth/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import ManageUsers from "./Components/Admin/manage/ManageUsers/ManageUsers.jsx";
import ManageMenu from "./Components/Admin/manage/ManageMenu/ManageMenu.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import ManageCategories from "./Components/Admin/manage/ManageCategories/ManageCategories.jsx";
import About from "./Components/About/About.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-menu" element={<ManageMenu />} />
          <Route path="manage-categories" element={<ManageCategories />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
