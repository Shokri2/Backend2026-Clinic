import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  People,
  MedicalServices,
  EventAvailable,
  Add,
  Close,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  // ================= DATA =================

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= DIALOGS =================

  const [doctorDialog, setDoctorDialog] = useState(false);
  const [serviceDialog, setServiceDialog] = useState(false);

  // ================= DOCTOR FORM =================

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    department: "",
    experience: "",
    image: "",
    about: "",
  });

  // ================= SERVICE FORM =================

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  // =====================================================
  // GET DATA
  // =====================================================

  const getDashboardData = async () => {
    try {
      setLoading(true);

      // Doctors
      const doctorsRes = await axios.get("http://localhost:3000/api/doctors");

      // Services
      const servicesRes = await axios.get("http://localhost:3000/api/services");

      // Users
      const token = localStorage.getItem("token");

      const usersRes = await axios.get("http://localhost:3000/api/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ================= SET DATA =================

      setDoctors(
        Array.isArray(doctorsRes.data)
          ? doctorsRes.data
          : doctorsRes.data.doctors || [],
      );

      setServices(
        Array.isArray(servicesRes.data)
          ? servicesRes.data
          : servicesRes.data.services || [],
      );

      setUsers(
        Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data.users || [],
      );
    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // =====================================================
  // ADD DOCTOR
  // =====================================================

  const handleDoctorChange = (e) => {
    setDoctorForm({
      ...doctorForm,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = async () => {
    try {
      if (!doctorForm.name || !doctorForm.department) {
        toast.error("Please enter doctor name and department");
        return;
      }

      await axios.post("http://localhost:3000/api/doctors", {
        name: doctorForm.name,
        department: doctorForm.department,
        experience: Number(doctorForm.experience) || 0,
        image: doctorForm.image,
        about: doctorForm.about,
      });

      toast.success("Doctor added successfully");

      setDoctorForm({
        name: "",
        department: "",
        experience: "",
        image: "",
        about: "",
      });

      setDoctorDialog(false);

      getDashboardData();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to add doctor");
    }
  };

  // =====================================================
  // ADD SERVICE
  // =====================================================

  const handleServiceChange = (e) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value,
    });
  };

  const addService = async () => {
    try {
      if (!serviceForm.title || !serviceForm.description) {
        toast.error("Please enter service title and description");

        return;
      }

      await axios.post("http://localhost:3000/api/services", {
        title: serviceForm.title,
        description: serviceForm.description,
        image: serviceForm.image,
        price: Number(serviceForm.price) || 0,
      });

      toast.success("Service added successfully");

      setServiceForm({
        title: "",
        description: "",
        image: "",
        price: "",
      });

      setServiceDialog(false);

      getDashboardData();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to add service");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#16704f",
          }}
        />
      </Box>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#eef2f7",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#16704f",
              fontFamily: "Poppins",
            }}
          >
            Admin Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontFamily: "Poppins",
            }}
          >
            Manage your clinic from one place 👋
          </Typography>
        </Box>

        {/* ================= STATISTICS ================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          {/* USERS */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  Registered Users
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    color: "#16704f",
                    fontFamily: "Poppins",
                  }}
                >
                  {users.length}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <People />
              </Avatar>
            </Box>
          </Paper>

          {/* DOCTORS */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  Total Doctors
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    color: "#16704f",
                    fontFamily: "Poppins",
                  }}
                >
                  {doctors.length}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <MedicalServices />
              </Avatar>
            </Box>
          </Paper>

          {/* SERVICES */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  Total Services
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    color: "#16704f",
                    fontFamily: "Poppins",
                  }}
                >
                  {services.length}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <EventAvailable />
              </Avatar>
            </Box>
          </Paper>
        </Box>

        {/* ================= DOCTORS ================= */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontFamily: "Poppins",
                }}
              >
                Doctors
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Manage clinic doctors
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDoctorDialog(true)}
              sx={{
                backgroundColor: "#16704f",
                borderRadius: 3,
                textTransform: "none",
                fontFamily: "Poppins",

                "&:hover": {
                  backgroundColor: "#10583e",
                },
              }}
            >
              Add Doctor
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {doctors.map((doctor) => (
              <Box
                key={doctor._id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#f8f9fb",
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  {doctor.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {doctor.department}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {doctor.experience} years experience
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* ================= SERVICES ================= */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontFamily: "Poppins",
                }}
              >
                Services
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Manage clinic services
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setServiceDialog(true)}
              sx={{
                backgroundColor: "#16704f",
                borderRadius: 3,
                textTransform: "none",
                fontFamily: "Poppins",

                "&:hover": {
                  backgroundColor: "#10583e",
                },
              }}
            >
              Add Service
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {services.map((service) => (
              <Box
                key={service._id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#f8f9fb",
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  {service.description}
                </Typography>

                <Typography
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    color: "#16704f",
                  }}
                >
                  ${service.price || 0}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* =====================================================
          ADD DOCTOR DIALOG
      ===================================================== */}

      <Dialog
        open={doctorDialog}
        onClose={() => setDoctorDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Add Doctor
          <IconButton
            onClick={() => setDoctorDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Doctor Name"
            name="name"
            value={doctorForm.name}
            onChange={handleDoctorChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Department"
            name="department"
            value={doctorForm.department}
            onChange={handleDoctorChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Experience"
            name="experience"
            type="number"
            value={doctorForm.experience}
            onChange={handleDoctorChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={doctorForm.image}
            onChange={handleDoctorChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="About Doctor"
            name="about"
            value={doctorForm.about}
            onChange={handleDoctorChange}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDoctorDialog(false)}
            sx={{
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={addDoctor}
            sx={{
              backgroundColor: "#16704f",
              textTransform: "none",
            }}
          >
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          ADD SERVICE DIALOG
      ===================================================== */}

      <Dialog
        open={serviceDialog}
        onClose={() => setServiceDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Add Service
          <IconButton
            onClick={() => setServiceDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Service Title"
            name="title"
            value={serviceForm.title}
            onChange={handleServiceChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={serviceForm.description}
            onChange={handleServiceChange}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={serviceForm.image}
            onChange={handleServiceChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={serviceForm.price}
            onChange={handleServiceChange}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setServiceDialog(false)}
            sx={{
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={addService}
            sx={{
              backgroundColor: "#16704f",
              textTransform: "none",
            }}
          >
            Add Service
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
