import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

import {
  CalendarMonth,
  CheckCircle,
  Cancel,
  EventAvailable,
  Person,
  Email,
  AccessTime,
  MedicalServices,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET DOCTOR APPOINTMENTS
  // =====================================================

  const getAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/doctors/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("DOCTOR APPOINTMENTS:", response.data);

      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("GET DOCTOR APPOINTMENTS ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to load doctor appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    getAppointments();
  }, []);

  // =====================================================
  // CURRENT DOCTOR
  // =====================================================

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // =====================================================
  // STATISTICS
  // =====================================================

  const total = appointments.length;

  const booked = appointments.filter(
    (appointment) => appointment.status === "Booked",
  ).length;

  const completed = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelled = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusColor = (status) => {
    if (status === "Booked") return "warning";
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "error";

    return "default";
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    if (status === "Booked") {
      return <EventAvailable fontSize="small" />;
    }

    if (status === "Completed") {
      return <CheckCircle fontSize="small" />;
    }

    if (status === "Cancelled") {
      return <Cancel fontSize="small" />;
    }

    return <CalendarMonth fontSize="small" />;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const formatted = new Date(`${date}T00:00:00`);

    return formatted.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // =====================================================
  // STAT CARD
  // =====================================================

  const StatCard = ({ title, value, icon }) => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 2,
          backgroundColor: "white",
          transition: "0.2s",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          },
        }}
      >
        <Box
          sx={{
            width: 55,
            height: 55,
            borderRadius: 3,
            backgroundColor: "#e5f4ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#12372A",
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            color="text.secondary"
            fontSize={14}
            sx={{
              fontFamily: "Poppins",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Paper>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#12372A",
            }}
          />

          <Typography
            sx={{
              mt: 2,
              color: "text.secondary",
              fontFamily: "Poppins",
            }}
          >
            Loading doctor dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
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
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

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
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#12372A",
            fontFamily: "Poppins",
          }}
        >
          Doctor Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontFamily: "Poppins",
          }}
        >
          Manage your appointments and patient information
        </Typography>
      </Box>

      {/* ================================================= */}
      {/* DOCTOR WELCOME CARD */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
          mb: 4,
          borderRadius: 4,
          backgroundColor: "#12372A",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Avatar
          sx={{
            width: 70,
            height: 70,
            backgroundColor: "white",
            color: "#12372A",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {currentUser?.name?.charAt(0)?.toUpperCase() || "D"}
        </Avatar>

        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontFamily: "Poppins",
            }}
          >
            Welcome, Dr. {currentUser?.name || "Doctor"}
          </Typography>

          <Typography
            sx={{
              opacity: 0.85,
              mt: 0.5,
              fontFamily: "Poppins",
            }}
          >
            {currentUser?.email || "Doctor account"}
          </Typography>
        </Box>

        <MedicalServices
          sx={{
            position: "absolute",
            right: 25,
            fontSize: 100,
            opacity: 0.08,
          }}
        />
      </Paper>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Appointments"
          value={total}
          icon={<CalendarMonth />}
        />

        <StatCard title="Booked" value={booked} icon={<EventAvailable />} />

        <StatCard title="Completed" value={completed} icon={<CheckCircle />} />

        <StatCard title="Cancelled" value={cancelled} icon={<Cancel />} />
      </Box>

      {/* ================================================= */}
      {/* APPOINTMENTS */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            p: 3,
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
            My Appointments
          </Typography>

          <Typography
            color="text.secondary"
            fontSize={14}
            sx={{
              mt: 0.5,
            }}
          >
            {appointments.length} appointment
            {appointments.length !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        {/* ================================================= */}
        {/* NO APPOINTMENTS */}
        {/* ================================================= */}

        {appointments.length === 0 ? (
          <Box
            sx={{
              py: 10,
              textAlign: "center",
            }}
          >
            <CalendarMonth
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
                color: "#12372A",
              }}
            >
              No Appointments Found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              You don't have any appointments yet.
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
                    {["Patient", "Email", "Date", "Time", "Status"].map(
                      (title) => (
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
                          }}
                        >
                          {title}
                        </Box>
                      ),
                    )}
                  </Box>
                </Box>

                <Box component="tbody">
                  {appointments.map((appointment) => (
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
                              width: 40,
                              height: 40,
                              backgroundColor: "#12372A",
                            }}
                          >
                            {appointment.user?.name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </Avatar>

                          <Typography fontWeight={600}>
                            {appointment.user?.name || "Unknown"}
                          </Typography>
                        </Box>
                      </Box>

                      {/* EMAIL */}

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
                            gap: 1,
                          }}
                        >
                          <Email
                            sx={{
                              fontSize: 18,
                              color: "#16704f",
                            }}
                          />

                          <Typography color="text.secondary" fontSize={14}>
                            {appointment.user?.email || "N/A"}
                          </Typography>
                        </Box>
                      </Box>

                      {/* DATE */}

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
                            gap: 1,
                          }}
                        >
                          <CalendarMonth
                            sx={{
                              fontSize: 18,
                              color: "#16704f",
                            }}
                          />

                          <Typography fontSize={14}>
                            {formatDate(appointment.date)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* TIME */}

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
                            gap: 1,
                          }}
                        >
                          <AccessTime
                            sx={{
                              fontSize: 18,
                              color: "#16704f",
                            }}
                          />

                          <Typography fontSize={14}>
                            {appointment.time}
                          </Typography>
                        </Box>
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
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
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
              {appointments.map((appointment) => (
                <Paper
                  key={appointment._id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {/* PATIENT */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#12372A",
                      }}
                    >
                      {appointment.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>

                    <Box>
                      <Typography fontWeight="bold">
                        {appointment.user?.name || "Unknown"}
                      </Typography>

                      <Typography color="text.secondary" fontSize={13}>
                        {appointment.user?.email || "N/A"}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  {/* DATE */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mt: 2,
                    }}
                  >
                    <CalendarMonth
                      sx={{
                        color: "#16704f",
                      }}
                    />

                    <Box>
                      <Typography fontSize={12} color="text.secondary">
                        Date
                      </Typography>

                      <Typography fontWeight={600}>
                        {formatDate(appointment.date)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* TIME */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mt: 2,
                    }}
                  >
                    <AccessTime
                      sx={{
                        color: "#16704f",
                      }}
                    />

                    <Box>
                      <Typography fontSize={12} color="text.secondary">
                        Time
                      </Typography>

                      <Typography fontWeight={600}>
                        {appointment.time}
                      </Typography>
                    </Box>
                  </Box>

                  {/* STATUS */}

                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Chip
                      icon={getStatusIcon(appointment.status)}
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;
