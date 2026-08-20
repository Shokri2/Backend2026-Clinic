
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Header
import Header from "./Components/Layout/Header.jsx";

// Auth
import Register from "./Components/Auth/Register.jsx";
import Login from "./Components/Auth/Login.jsx";

// Public Pages
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Doctors from "./Components/Doctors/Doctors.jsx";
import Services from "./Components/service/Services.jsx";

// Booking
import Booking from "./Components/Service/Booking/Booking.jsx";

// Admin
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import AdminRoute from "./Components/Admin/AdminRoute.jsx";
import ManageUsers from "./Components/Admin/manage/ManageUsers/ManageUsers.jsx";
import ManageMenu from "./Components/Admin/manage/ManageMenu/ManageMenu.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import ManageCategories from "./Components/Admin/manage/ManageCategories/ManageCategories.jsx";
import ManageShifts from "./Components/Admin/manage/ManageShifts/ManageShifts.jsx";
import ManageDoctors from "./Components/Admin/manage/ManageDoctors/ManageDoctors.jsx";
import ManageServices from "./Components/Admin/manage/ManageServices/ManageServices.jsx";
import ManageAppointments from "./Components/Admin/manage/ManageAppointments";

// Doctor
import DoctorDashboard from "./Components/doctor/DoctorDashboard.jsx";

// User
import UserLayout from "./Components/User/UserLayout.jsx";
import UserDashboard from "./Components/User/UserDashboard.jsx";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        {/* ================= PUBLIC PAGES ================= */}

        <Route
          path="/"
          element={
            <>
              <Header />
              <LandingPage />
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        <Route
          path="/About"
          element={
            <>
              <Header />
              <About />
            </>
          }
        />

        <Route
          path="/Doctors"
          element={
            <>
              <Header />
              <Doctors />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Header />
              <Services />
            </>
          }
        />

        {/* ================= AUTH ================= */}

        <Route path="/create-account" element={<Register />} />

        <Route path="/login" element={<Login />} />

        {/* ================= USER ================= */}

        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="home" element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="doctors" element={<Doctors />} />

          <Route path="services" element={<Services />} />

          <Route path="booking/:serviceId" element={<Booking />} />

          <Route path="booking/doctor/:doctorId" element={<Booking />} />
        </Route>

        {/* ================= ADMIN ================= */}

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="manage-users" element={<ManageUsers />} />

            <Route path="manage-menu" element={<ManageMenu />} />

            <Route
              path="manage-categories"
              element={<ManageCategories />}
            />

            <Route path="manage-shifts" element={<ManageShifts />} />

            <Route path="manage-doctors" element={<ManageDoctors />} />

            <Route path="manage-services" element={<ManageServices />} />

            <Route
              path="manage-appointments"
              element={<ManageAppointments />}
            />
          </Route>
        </Route>

        {/* ================= DOCTOR ================= */}

        <Route
          path="/doctor/dashboard"
          element={<DoctorDashboard />}
        />
      </Routes>
    </>
  );
}

export default App;

