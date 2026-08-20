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

import { Add, Edit, Delete, MedicalServices } from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  // =====================================================
  // BACKEND URL
  // =====================================================

  const API_URL = "http://localhost:3000";

  // =====================================================
  // GET SERVICES
  // =====================================================

  const getServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/services`);

      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading services:", error);

      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

const getImageUrl = (image) => {
  if (!image) return "";

  // إذا الرابط كامل
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // إذا قاعدة البيانات تخزن /uploads/...
  if (image.startsWith("/uploads/")) {
    return `http://localhost:3000${image}`;
  }

  // إذا قاعدة البيانات تخزن uploads/...
  if (image.startsWith("uploads/")) {
    return `http://localhost:3000/${image}`;
  }

  // إذا قاعدة البيانات تخزن اسم الملف فقط
  // مثال: Nutrition Consultation.png
  return `http://localhost:3000/uploads/${encodeURIComponent(image)}`;
};
  // =====================================================
  // IMAGE ERROR
  // =====================================================

  const handleImageError = (event, image) => {
    console.error("====================================");
    console.error("IMAGE ERROR");
    console.error("Original image:", image);
    console.error("Final image URL:", getImageUrl(image));
    console.error("====================================");

    event.currentTarget.style.display = "none";

    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.setAttribute(
        "data-image-error",
        "true",
      );
    }
  };

  // =====================================================
  // OPEN ADD
  // =====================================================

  const handleAdd = () => {
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      image: "",
      price: "",
    });

    setOpen(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title || "",
      description: service.description || "",
      image: service.image || "",
      price: service.price ?? "",
    });

    setOpen(true);
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    setOpen(false);
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      image: "",
      price: "",
    });
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // SAVE SERVICE
  // =====================================================

  const handleSave = async () => {
    try {
      // Validate title
      if (!formData.title.trim()) {
        toast.error("Service title is required");
        return;
      }

      // Validate description
      if (!formData.description.trim()) {
        toast.error("Service description is required");
        return;
      }

      const data = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        price: formData.price === "" ? 0 : Number(formData.price),
      };

      // =================================================
      // UPDATE
      // =================================================

      if (editingService) {
        await axios.put(`${API_URL}/api/services/${editingService._id}`, data);

        toast.success("Service updated successfully");
      }

      // =================================================
      // CREATE
      // =================================================
      else {
        await axios.post(`${API_URL}/api/services`, data);

        toast.success("Service added successfully");
      }

      handleClose();

      await getServices();
    } catch (error) {
      console.error("Service operation error:", error);

      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // =====================================================
  // DELETE SERVICE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/services/${id}`);

      toast.success("Service deleted successfully");

      await getServices();
    } catch (error) {
      console.error("Delete service error:", error);

      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
            }}
          >
            Manage Services
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontFamily: "Poppins",
            }}
          >
            Add, edit and delete medical services
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#12372A",
            borderRadius: 3,
            px: 3,
            py: 1.3,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 600,

            "&:hover": {
              backgroundColor: "#0d2b21",
            },
          }}
        >
          Add Service
        </Button>
      </Box>

      {/* ================================================= */}
      {/* SERVICES COUNT */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
        }}
      >
        <Typography
          color="text.secondary"
          sx={{
            fontFamily: "Poppins",
          }}
        >
          Total Services
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#12372A",
            fontFamily: "Poppins",
            mt: 0.5,
          }}
        >
          {services.length}
        </Typography>
      </Paper>

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading ? (
        <Box
          sx={{
            py: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#12372A",
            }}
          />
        </Box>
      ) : services.length === 0 ? (
        /* ================================================= */
        /* EMPTY */
        /* ================================================= */

        <Paper
          elevation={0}
          sx={{
            py: 10,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <MedicalServices
            sx={{
              fontSize: 65,
              color: "#b8c9c1",
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontFamily: "Poppins",
            }}
          >
            No Services Found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 3,
              fontFamily: "Poppins",
            }}
          >
            Add your first medical service.
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{
              backgroundColor: "#12372A",
              borderRadius: 3,
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#0d2b21",
              },
            }}
          >
            Add Service
          </Button>
        </Paper>
      ) : (
        /* ================================================= */
        /* SERVICES */
        /* ================================================= */

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {services.map((service) => (
            <Paper
              key={service._id}
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                transition: "0.2s",

                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* ================================================= */}
              {/* IMAGE */}
              {/* ================================================= */}

              {service.image ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 210,
                    backgroundColor: "#e5f4ed",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={getImageUrl(service.image)}
                    alt={service.title}
                    onError={(e) => handleImageError(e, service.image)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* fallback icon */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "none",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MedicalServices
                      sx={{
                        fontSize: 70,
                        color: "#12372A",
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 210,
                    backgroundColor: "#e5f4ed",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MedicalServices
                    sx={{
                      fontSize: 70,
                      color: "#12372A",
                    }}
                  />
                </Box>
              )}

              {/* ================================================= */}
              {/* CONTENT */}
              {/* ================================================= */}

              <Box sx={{ p: 2.5 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#12372A",
                    fontFamily: "Poppins",
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    minHeight: 60,
                    lineHeight: 1.7,
                    fontFamily: "Poppins",
                  }}
                >
                  {service.description}
                </Typography>

                {/* PRICE */}

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#16704f",
                    fontFamily: "Poppins",
                  }}
                >
                  ${service.price ?? 0}
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
                  {/* EDIT */}

                  <IconButton
                    onClick={() => handleEdit(service)}
                    sx={{
                      color: "#16704f",
                      backgroundColor: "#e5f4ed",

                      "&:hover": {
                        backgroundColor: "#d4ecdf",
                      },
                    }}
                  >
                    <Edit />
                  </IconButton>

                  {/* DELETE */}

                  <IconButton
                    onClick={() => handleDelete(service._id)}
                    sx={{
                      color: "#c62828",
                      backgroundColor: "#fde2e2",

                      "&:hover": {
                        backgroundColor: "#f8d0d0",
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* ================================================= */}
      {/* ADD / EDIT DIALOG */}
      {/* ================================================= */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          {editingService ? "Edit Service" : "Add Service"}
        </DialogTitle>

        <DialogContent>
          {/* SERVICE TITLE */}

          <TextField
            fullWidth
            name="title"
            label="Service Title"
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}

          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={4}
            margin="normal"
            value={formData.description}
            onChange={handleChange}
          />

          {/* IMAGE */}

          <TextField
            fullWidth
            name="image"
            label="Image Path"
            placeholder="/uploads/Dental Care.png"
            helperText="Example: /uploads/Dental Care.png"
            margin="normal"
            value={formData.image}
            onChange={handleChange}
          />

          {/* IMAGE PREVIEW */}

          {formData.image && (
            <Box
              sx={{
                mt: 2,
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                backgroundColor: "#e5f4ed",
              }}
            >
              <Box
                component="img"
                src={getImageUrl(formData.image)}
                alt="Service Preview"
                onError={(e) => handleImageError(e, formData.image)}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          )}

          {/* SHOW FINAL URL */}

          {formData.image && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 1,
                wordBreak: "break-all",
              }}
            >
              Image URL: {getImageUrl(formData.image)}
            </Typography>
          )}

          {/* PRICE */}

          <TextField
            fullWidth
            name="price"
            label="Price"
            type="number"
            margin="normal"
            value={formData.price}
            onChange={handleChange}
            inputProps={{
              min: 0,
            }}
          />
        </DialogContent>

        {/* ================================================= */}
        {/* DIALOG ACTIONS */}
        {/* ================================================= */}

        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "#666",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#12372A",
              borderRadius: 2,
              textTransform: "none",
              px: 3,

              "&:hover": {
                backgroundColor: "#0d2b21",
              },
            }}
          >
            {editingService ? "Update Service" : "Add Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
