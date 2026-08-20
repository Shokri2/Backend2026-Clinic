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
    department: "",
    experience: "",
    image: "",
    about: "",
  });

  // ================= GET DOCTORS =================

  const getDoctors = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/doctors");

      setDoctors(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // ================= OPEN ADD =================

  const handleAdd = () => {
    setEditingDoctor(null);

    setFormData({
      name: "",
      department: "",
      experience: "",
      image: "",
      about: "",
    });

    setOpen(true);
  };

  // ================= OPEN EDIT =================

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);

    setFormData({
      name: doctor.name || "",
      department: doctor.department || "",
      experience: doctor.experience || "",
      image: doctor.image || "",
      about: doctor.about || "",
    });

    setOpen(true);
  };

  // ================= SAVE =================

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.department) {
        toast.error("Please fill required fields");
        return;
      }

      if (editingDoctor) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/api/doctors/${editingDoctor._id}`,
          formData,
        );

        toast.success("Doctor updated successfully");
      } else {
        // CREATE
        await axios.post("http://localhost:3000/api/doctors", formData);

        toast.success("Doctor added successfully");
      }

      setOpen(false);

      getDoctors();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  // ================= DELETE =================

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
      console.error(error);
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
      }}
    >
      {/* HEADER */}

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

      {/* LOADING */}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress sx={{ color: "#16704f" }} />
        </Box>
      ) : (
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
              {/* IMAGE */}

              <Box
                component="img"
                src={doctor.image || "https://via.placeholder.com/300"}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />

              {/* INFO */}

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

              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {doctor.department}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Experience: {doctor.experience} years
              </Typography>

              {/* ACTIONS */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 2,
                }}
              >
                <IconButton
                  onClick={() => handleEdit(doctor)}
                  sx={{
                    color: "#16704f",
                  }}
                >
                  <Edit />
                </IconButton>

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

      {/* ================= ADD / EDIT DIALOG ================= */}

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
          />

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
