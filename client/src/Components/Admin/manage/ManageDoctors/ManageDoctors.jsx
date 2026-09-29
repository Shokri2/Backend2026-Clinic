import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

import { Add, Edit, Delete } from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    experience: "",
    price: "",
    image: "",
    about: "",
  });

  // =========================
  // GET DOCTORS
  // =========================
  const getDoctors = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/doctors");

      setDoctors(res.data);
    } catch (error) {
      console.error("GET DOCTORS ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // =========================
  // ADD DOCTOR
  // =========================
  const handleAdd = () => {
    setEditingDoctor(null);

    setFormData({
      name: "",
      email: "",
      department: "",
      experience: "",
      price: "",
      image: "",
      about: "",
    });

    setOpen(true);
  };

  // =========================
  // EDIT DOCTOR
  // =========================
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);

    setFormData({
      name: doctor.name || "",

      // If the backend populates user
      email: doctor.user?.email || doctor.email || "",

      department: doctor.department || "",

      experience: doctor.experience ?? "",

      price: doctor.price ?? "",

      image: doctor.image || "",

      about: doctor.about || "",
    });

    setOpen(true);
  };

  // =========================
  // SAVE DOCTOR
  // =========================
  const handleSave = async () => {
    try {
      // Required fields
      if (!formData.name.trim()) {
        toast.error("Doctor name is required");
        return;
      }

      if (!formData.email.trim()) {
        toast.error("Doctor email is required");
        return;
      }

      if (!formData.department.trim()) {
        toast.error("Department is required");
        return;
      }

      // Validate experience
      if (formData.experience === "" || Number(formData.experience) < 0) {
        toast.error("Please enter valid experience");
        return;
      }

      // Validate price
      if (
        formData.price === "" ||
        Number(formData.price) < 20 ||
        Number(formData.price) > 50
      ) {
        toast.error("Price must be between 20 and 50");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email");
        return;
      }

      const dataToSend = {
        name: formData.name.trim(),

        email: formData.email.trim().toLowerCase(),

        department: formData.department.trim(),

        experience: Number(formData.experience),

        price: Number(formData.price),

        image: formData.image.trim(),

        about: formData.about.trim(),
      };

      console.log("DOCTOR DATA:", dataToSend);

      // =========================
      // UPDATE
      // =========================
      if (editingDoctor) {
        const response = await axios.put(
          `http://localhost:3000/api/doctors/${editingDoctor._id}`,
          dataToSend,
        );

        console.log("UPDATE DOCTOR RESPONSE:", response.data);

        toast.success("Doctor updated successfully");
      }

      // =========================
      // CREATE
      // =========================
      else {
        const response = await axios.post(
          "http://localhost:3000/api/doctors",
          dataToSend,
        );

        console.log("CREATE DOCTOR RESPONSE:", response.data);

        toast.success("Doctor added successfully");
      }

      // Close dialog
      setOpen(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        department: "",
        experience: "",
        price: "",
        image: "",
        about: "",
      });

      setEditingDoctor(null);

      // Refresh doctors
      getDoctors();
    } catch (error) {
      console.error("DOCTOR SAVE ERROR:", error);

      console.log("BACKEND RESPONSE:", error.response?.data);

      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // =========================
  // DELETE DOCTOR
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/doctors/${id}`);

      toast.success("Doctor deleted successfully");

      getDoctors();
    } catch (error) {
      console.error("DELETE DOCTOR ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to delete doctor");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* =========================
          HEADER
      ========================= */}
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
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "Poppins",
              color: "#16704f",
            }}
          >
            Manage Doctors
          </Typography>

          <Typography color="text.secondary">
            Add, edit and delete doctors
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#16704f",
            borderRadius: 3,
            textTransform: "none",

            "&:hover": {
              backgroundColor: "#10583e",
            },
          }}
        >
          Add Doctor
        </Button>
      </Box>

      {/* =========================
          LOADING
      ========================= */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress
            sx={{
              color: "#16704f",
            }}
          />
        </Box>
      ) : (
        /* =========================
           DOCTORS
        ========================= */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {doctors.map((doctor) => (
            <Paper
              key={doctor._id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                border: "1px solid #e5e7eb",
              }}
            >
              {/* Doctor Image */}
              <Box
                component="img"
                src={doctor.image || "https://via.placeholder.com/300"}
                alt={doctor.name}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />

              {/* Name */}
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mt: 2,
                  fontFamily: "Poppins",
                }}
              >
                Dr. {doctor.name}
              </Typography>

              {/* Department */}
              <Typography
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                {doctor.department}
              </Typography>

              {/* Experience */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Experience: {doctor.experience} years
              </Typography>

              {/* Email */}
              {doctor.user?.email && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {doctor.user.email}
                </Typography>
              )}

              {/* Price */}
              <Typography
                sx={{
                  mt: 1,
                  color: "#16704f",
                  fontWeight: 700,
                  fontSize: "17px",
                  fontFamily: "Poppins",
                }}
              >
                ${doctor.price} / Appointment
              </Typography>

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 2,
                }}
              >
                {/* Edit */}
                <IconButton
                  onClick={() => handleEdit(doctor)}
                  sx={{
                    color: "#16704f",
                  }}
                >
                  <Edit />
                </IconButton>

                {/* Delete */}
                <IconButton
                  onClick={() => handleDelete(doctor._id)}
                  sx={{
                    color: "#d32f2f",
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* =========================
          ADD / EDIT DIALOG
      ========================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingDoctor ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>

        <DialogContent>
          {/* Doctor Name */}
          <TextField
            fullWidth
            label="Doctor Name"
            margin="normal"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          {/* Doctor Email */}
          <TextField
            fullWidth
            label="Doctor Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            helperText="This email will be used for doctor login"
          />

          {/* Department */}
          <TextField
            fullWidth
            label="Department"
            margin="normal"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value,
              })
            }
          />

          {/* Experience */}
          <TextField
            fullWidth
            label="Experience"
            type="number"
            margin="normal"
            value={formData.experience}
            onChange={(e) =>
              setFormData({
                ...formData,
                experience: e.target.value,
              })
            }
            slotProps={{
              htmlInput: {
                min: 0,
              },
            }}
          />

          {/* Price */}
          <TextField
            fullWidth
            label="Appointment Price"
            type="number"
            margin="normal"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            slotProps={{
              htmlInput: {
                min: 20,
                max: 50,
              },
            }}
            helperText="Price must be between $20 and $50"
          />

          {/* Image */}
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={formData.image}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value,
              })
            }
          />

          {/* About */}
          <TextField
            fullWidth
            label="About"
            multiline
            rows={4}
            margin="normal"
            value={formData.about}
            onChange={(e) =>
              setFormData({
                ...formData,
                about: e.target.value,
              })
            }
          />
        </DialogContent>

        {/* =========================
            DIALOG ACTIONS
        ========================= */}
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#16704f",

              "&:hover": {
                backgroundColor: "#10583e",
              },
            }}
          >
            {editingDoctor ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
