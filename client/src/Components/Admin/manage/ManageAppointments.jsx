import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

import {
  Event,
  PendingActions,
  CheckCircle,
  Cancel,
  Edit,
  Delete,
  Search,
  Person,
  MedicalServices,
  AccessTime,
  CalendarMonth,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageAppointments() {
  const API_URL = "http://localhost:3000";

  // =====================================================
  // STATE
  // =====================================================

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [editData, setEditData] = useState({
    date: "",
    time: "",
    service: "",
    doctor: "",
    status: "",
  });

  // =====================================================
  // GET ALL APPOINTMENTS
  // =====================================================

  const getAppointments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        setAppointments([]);
        return;
      }

      const res = await axios.get(`${API_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("APPOINTMENTS RESPONSE:", res.data);

      setAppointments(
        Array.isArray(res.data.appointments) ? res.data.appointments : [],
      );
    } catch (error) {
      console.error("GET APPOINTMENTS ERROR:", error);

      if (error.response?.status === 401) {
        toast.error("Please login again");
      } else if (error.response?.status === 403) {
        toast.error("Admin access required");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load appointments",
        );
      }

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // =====================================================
  // STATUS LABEL
  // =====================================================

  const getStatusLabel = (status) => {
    if (status === "Booked") return "Booked";
    if (status === "Completed") return "Completed";
    if (status === "Cancelled") return "Cancelled";
    if (status === "Pending") return "Pending";

    return status || "Unknown";
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusColor = (status) => {
    if (status === "Booked") return "info";
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "error";
    if (status === "Pending") return "warning";

    return "default";
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle fontSize="small" />;
    }

    if (status === "Cancelled") {
      return <Cancel fontSize="small" />;
    }

    if (status === "Pending") {
      return <PendingActions fontSize="small" />;
    }

    return <Event fontSize="small" />;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);

    setEditData({
      date: appointment.date || "",
      time: appointment.time || "",
      service: appointment.service?._id || "",
      doctor: appointment.doctor?._id || "",
      status: appointment.status || "Booked",
    });

    setEditOpen(true);
  };

  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedAppointment(null);

    setEditData({
      date: "",
      time: "",
      service: "",
      doctor: "",
      status: "",
    });
  };

  // =====================================================
  // HANDLE EDIT CHANGE
  // =====================================================

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE APPOINTMENT
  // =====================================================

  const handleUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const updateData = {
        date: editData.date,
        time: editData.time,
        service: editData.service || undefined,
        doctor: editData.doctor || undefined,
        status: editData.status,
      };

      await axios.put(
        `${API_URL}/api/appointments/${selectedAppointment._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Appointment updated successfully");

      handleCloseEdit();

      await getAppointments();
    } catch (error) {
      console.error("UPDATE APPOINTMENT ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to update appointment",
      );
    }
  };

  // =====================================================
  // DELETE APPOINTMENT
  // =====================================================

  const handleDelete = async (appointment) => {
    const patientName = appointment.user?.name || "this patient";

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the appointment for ${patientName}?`,
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      await axios.delete(`${API_URL}/api/appointments/${appointment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment deleted successfully");

      await getAppointments();
    } catch (error) {
      console.error("DELETE APPOINTMENT ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete appointment",
      );
    }
  };

  // =====================================================
  // QUICK STATUS UPDATE
  // =====================================================

  const handleStatusChange = async (appointment, status) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      await axios.put(
        `${API_URL}/api/appointments/${appointment._id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Appointment status updated");

      await getAppointments();
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredAppointments = appointments.filter((appointment) => {
    const searchValue = search.toLowerCase().trim();

    const patientName = appointment.user?.name?.toLowerCase() || "";

    const patientEmail = appointment.user?.email?.toLowerCase() || "";

    const doctorName = appointment.doctor?.name?.toLowerCase() || "";

    const serviceName = appointment.service?.title?.toLowerCase() || "";

    const matchesSearch =
      patientName.includes(searchValue) ||
      patientEmail.includes(searchValue) ||
      doctorName.includes(searchValue) ||
      serviceName.includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalAppointments = appointments.length;

  const totalPending = appointments.filter(
    (appointment) => appointment.status === "Pending",
  ).length;

  const totalBooked = appointments.filter(
    (appointment) => appointment.status === "Booked",
  ).length;

  const totalCompleted = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const totalCancelled = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  // =====================================================
  // COMPACT STAT CARD
  // =====================================================

  const StatCard = ({ title, value, icon }) => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "white",
          minHeight: 75,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: "#e5f4ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#12372A",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            color="text.secondary"
            sx={{
              fontFamily: "Poppins",
              fontSize: 12,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Paper>
    );
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

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#12372A",
            fontFamily: "Poppins",
          }}
        >
          Manage Appointments
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontFamily: "Poppins",
          }}
        >
          Manage patient appointments, schedules and statuses
        </Typography>
      </Box>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 1.5,
          mb: 3,
        }}
      >
        <StatCard title="Total" value={totalAppointments} icon={<Event />} />

        <StatCard
          title="Pending"
          value={totalPending}
          icon={<PendingActions />}
        />

        <StatCard title="Booked" value={totalBooked} icon={<CalendarMonth />} />

        <StatCard
          title="Completed"
          value={totalCompleted}
          icon={<CheckCircle />}
        />

        <StatCard title="Cancelled" value={totalCancelled} icon={<Cancel />} />
      </Box>

      {/* ================================================= */}
      {/* SEARCH & FILTER */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search patient, doctor or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    mr: 1,
                    color: "text.secondary",
                  }}
                />
              ),
            }}
          />

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 220,
              },
            }}
          >
            <InputLabel>Status</InputLabel>

            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Appointments</MenuItem>

              <MenuItem value="Pending">Pending</MenuItem>

              <MenuItem value="Booked">Booked</MenuItem>

              <MenuItem value="Completed">Completed</MenuItem>

              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* ================================================= */}
      {/* APPOINTMENTS */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
            }}
          >
            All Appointments
          </Typography>

          <Typography color="text.secondary" fontSize={14}>
            {filteredAppointments.length} appointments found
          </Typography>
        </Box>

        {/* LOADING */}

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
        ) : filteredAppointments.length === 0 ? (
          <Box
            sx={{
              py: 10,
              textAlign: "center",
            }}
          >
            <Event
              sx={{
                fontSize: 65,
                color: "#b8c9c1",
                mb: 2,
              }}
            />

            <Typography variant="h6" fontWeight="bold">
              No Appointments Found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Try changing your search or filter.
            </Typography>
          </Box>
        ) : (
          <>
            {/* ================================================= */}
            {/* DESKTOP */}
            {/* ================================================= */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
                overflowX: "auto",
              }}
            >
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    {[
                      "Patient",
                      "Doctor",
                      "Service",
                      "Date",
                      "Time",
                      "Status",
                      "Actions",
                    ].map((title) => (
                      <Box
                        component="th"
                        key={title}
                        sx={{
                          textAlign: "left",
                          p: 2,
                          color: "text.secondary",
                          fontSize: 14,
                          fontWeight: 600,
                          borderBottom: "1px solid #e5e7eb",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {title}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box component="tbody">
                  {filteredAppointments.map((appointment) => (
                    <Box
                      component="tr"
                      key={appointment._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f8faf9",
                        },
                      }}
                    >
                      {/* PATIENT */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              backgroundColor: "#12372A",
                            }}
                          >
                            {appointment.user?.name?.charAt(0)?.toUpperCase()}
                          </Avatar>

                          <Box>
                            <Typography fontWeight={600}>
                              {appointment.user?.name || "Unknown"}
                            </Typography>

                            <Typography color="text.secondary" fontSize={12}>
                              {appointment.user?.email || "-"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* DOCTOR */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Typography>
                          {appointment.doctor?.name || "Not assigned"}
                        </Typography>
                      </Box>

                      {/* SERVICE */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Typography>
                          {appointment.service?.title || "Not assigned"}
                        </Typography>
                      </Box>

                      {/* DATE */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(appointment.date)}
                      </Box>

                      {/* TIME */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {appointment.time || "-"}
                      </Box>

                      {/* STATUS */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Chip
                          icon={getStatusIcon(appointment.status)}
                          label={getStatusLabel(appointment.status)}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
                      </Box>

                      {/* ACTIONS */}

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <IconButton
                          onClick={() => handleEdit(appointment)}
                          sx={{
                            color: "#16704f",
                            backgroundColor: "#e5f4ed",
                            mr: 1,
                          }}
                        >
                          <Edit />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDelete(appointment)}
                          sx={{
                            color: "#c62828",
                            backgroundColor: "#fde2e2",
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* ================================================= */}
            {/* MOBILE */}
            {/* ================================================= */}

            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                p: 2,
              }}
            >
              {filteredAppointments.map((appointment) => (
                <Paper
                  key={appointment._id}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {/* PATIENT */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: "#12372A",
                        }}
                      >
                        {appointment.user?.name?.charAt(0)?.toUpperCase()}
                      </Avatar>

                      <Box>
                        <Typography fontWeight="bold">
                          {appointment.user?.name || "Unknown"}
                        </Typography>

                        <Typography color="text.secondary" fontSize={13}>
                          {appointment.user?.email || "-"}
                        </Typography>

                        <Chip
                          icon={getStatusIcon(appointment.status)}
                          label={getStatusLabel(appointment.status)}
                          color={getStatusColor(appointment.status)}
                          size="small"
                          sx={{
                            mt: 1,
                          }}
                        />
                      </Box>
                    </Box>

                    {/* ACTIONS */}

                    <Box>
                      <IconButton
                        onClick={() => handleEdit(appointment)}
                        sx={{
                          color: "#16704f",
                        }}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(appointment)}
                        sx={{
                          color: "#c62828",
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* DETAILS */}

                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Person fontSize="small" />

                      <Typography fontSize={14}>
                        Doctor: {appointment.doctor?.name || "Not assigned"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <MedicalServices fontSize="small" />

                      <Typography fontSize={14}>
                        Service: {appointment.service?.title || "Not assigned"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <CalendarMonth fontSize="small" />

                      <Typography fontSize={14}>
                        Date: {formatDate(appointment.date)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <AccessTime fontSize="small" />

                      <Typography fontSize={14}>
                        Time: {appointment.time || "-"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>

      {/* ================================================= */}
      {/* EDIT APPOINTMENT DIALOG */}
      {/* ================================================= */}

      <Dialog open={editOpen} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "#12372A",
          }}
        >
          Edit Appointment
        </DialogTitle>

        <DialogContent>
          {selectedAppointment && (
            <Box sx={{ pt: 1 }}>
              {/* PATIENT INFO */}

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  backgroundColor: "#f5f7fa",
                  borderRadius: 3,
                }}
              >
                <Typography fontWeight="bold">Patient</Typography>

                <Typography color="text.secondary" fontSize={14}>
                  {selectedAppointment.user?.name || "Unknown"}
                </Typography>

                <Typography color="text.secondary" fontSize={13}>
                  {selectedAppointment.user?.email || "-"}
                </Typography>
              </Paper>

              {/* DATE */}

              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={editData.date}
                onChange={handleEditChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />

              {/* TIME */}

              <TextField
                fullWidth
                label="Time"
                type="time"
                name="time"
                value={editData.time}
                onChange={handleEditChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />

              {/* DOCTOR */}

              <TextField
                fullWidth
                label="Doctor ID"
                name="doctor"
                value={editData.doctor}
                onChange={handleEditChange}
                helperText="Enter the Doctor ID"
                sx={{ mb: 2 }}
              />

              {/* SERVICE */}

              <TextField
                fullWidth
                label="Service ID"
                name="service"
                value={editData.service}
                onChange={handleEditChange}
                helperText="Enter the Service ID"
                sx={{ mb: 2 }}
              />

              {/* STATUS */}

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>

                <Select
                  name="status"
                  value={editData.status}
                  label="Status"
                  onChange={handleEditChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>

                  <MenuItem value="Booked">Booked</MenuItem>

                  <MenuItem value="Completed">Completed</MenuItem>

                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseEdit}
            sx={{
              textTransform: "none",
              color: "#666",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#12372A",
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#0d2b21",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
