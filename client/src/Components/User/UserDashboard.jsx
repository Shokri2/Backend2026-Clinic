import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  Add,
  ChevronLeft,
  ChevronRight,
  NotificationsNone,
  Settings,
  AccessTime,
  CalendarMonth,
  EventAvailable,
  CheckCircle,
  Cancel,
  ArrowForward,
  MedicalServices,
} from "@mui/icons-material";

import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../Context/UserContext";

export default function UserDashboard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // ================= GET USER APPOINTMENTS =================

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);

        const userId = currentUser?._id || currentUser?.id;

        if (!userId) {
          setAppointments([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/api/appointments/user/${userId}`,
        );

        console.log("User Appointments:", res.data);

        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error loading appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      getAppointments();
    } else {
      setAppointments([]);
      setLoading(false);
    }
  }, [currentUser]);

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ================= FORMAT TIME =================

  const formatTime = (time) => {
    if (!time) return "No time";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= GET SERVICE NAME =================

  const getServiceName = (appointment) => {
    return (
      appointment.service?.title ||
      appointment.serviceTitle ||
      appointment.serviceName ||
      null
    );
  };

  // ================= GET DOCTOR NAME =================

  const getDoctorName = (appointment) => {
    return (
      appointment.doctor?.name ||
      appointment.doctorName ||
      appointment.doctor?.fullName ||
      null
    );
  };

  // ================= GET PRICE =================

  const getPrice = (appointment) => {
    return (
      appointment.service?.price ??
      appointment.servicePrice ??
      appointment.price ??
      null
    );
  };

  // ================= STATUS =================

  const getStatus = (appointment) => {
    return appointment.status || "Booked";
  };

  // ================= STATISTICS =================

  const totalAppointments = appointments.length;

  const upcomingAppointments = appointments.filter((appointment) => {
    const status = getStatus(appointment).toLowerCase();

    return (
      status !== "completed" && status !== "cancelled" && status !== "canceled"
    );
  }).length;

  const completedAppointments = appointments.filter(
    (appointment) => getStatus(appointment).toLowerCase() === "completed",
  ).length;

  const cancelledAppointments = appointments.filter((appointment) => {
    const status = getStatus(appointment).toLowerCase();

    return status === "cancelled" || status === "canceled";
  }).length;

  // ================= NEXT APPOINTMENT =================

  const nextAppointment = useMemo(() => {
    const upcoming = appointments.filter((appointment) => {
      const status = getStatus(appointment).toLowerCase();

      return (
        status !== "completed" &&
        status !== "cancelled" &&
        status !== "canceled"
      );
    });

    if (upcoming.length === 0) return null;

    return [...upcoming].sort((a, b) => {
      const dateA = new Date(`${a.date || "9999-12-31"}T${a.time || "23:59"}`);

      const dateB = new Date(`${b.date || "9999-12-31"}T${b.time || "23:59"}`);

      return dateA - dateB;
    })[0];
  }, [appointments]);

  // ================= FILTER =================

  const filteredAppointments = appointments.filter((appointment) => {
    const status = getStatus(appointment).toLowerCase();

    if (filter === "All") return true;

    if (filter === "Upcoming") {
      return (
        status !== "completed" &&
        status !== "cancelled" &&
        status !== "canceled"
      );
    }

    if (filter === "Completed") {
      return status === "completed";
    }

    if (filter === "Cancelled") {
      return status === "cancelled" || status === "canceled";
    }

    return true;
  });

  // ================= STATUS COLORS =================

  const getStatusStyle = (status) => {
    const value = status.toLowerCase();

    if (value === "completed") {
      return {
        backgroundColor: "#d9f0e3",
        color: "#16704f",
      };
    }

    if (value === "cancelled" || value === "canceled") {
      return {
        backgroundColor: "#fde2e2",
        color: "#c62828",
      };
    }

    return {
      backgroundColor: "#e5f4ed",
      color: "#16704f",
    };
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#eef2f7",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* ===================================================== */}
        {/* TOP HEADER */}
        {/* ===================================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#16704f",
                fontFamily: "Poppins",
              }}
            >
              My Appointments
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontFamily: "Poppins",
                mt: 0.5,
              }}
            >
              Welcome back, {currentUser?.name || "Patient"} 👋
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/user/services")}
            sx={{
              backgroundColor: "#16704f",
              borderRadius: 3,
              px: 3,
              py: 1.4,
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: 600,

              "&:hover": {
                backgroundColor: "#10583e",
              },
            }}
          >
            Book Appointment
          </Button>
        </Box>

        {/* ===================================================== */}
        {/* STATS */}
        {/* ===================================================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          {/* TOTAL */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #edf0f2",
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
                  fontSize={14}
                  sx={{ fontFamily: "Poppins" }}
                >
                  Total Appointments
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    color: "#16704f",
                  }}
                >
                  {totalAppointments}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <CalendarMonth />
              </Avatar>
            </Box>
          </Paper>

          {/* UPCOMING */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #edf0f2",
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
                  fontSize={14}
                  sx={{ fontFamily: "Poppins" }}
                >
                  Upcoming
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    color: "#16704f",
                  }}
                >
                  {upcomingAppointments}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <EventAvailable />
              </Avatar>
            </Box>
          </Paper>

          {/* COMPLETED */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #edf0f2",
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
                  fontSize={14}
                  sx={{ fontFamily: "Poppins" }}
                >
                  Completed
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    color: "#16704f",
                  }}
                >
                  {completedAppointments}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  backgroundColor: "#e5f4ed",
                  color: "#16704f",
                }}
              >
                <CheckCircle />
              </Avatar>
            </Box>
          </Paper>

          {/* CANCELLED */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #edf0f2",
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
                  fontSize={14}
                  sx={{ fontFamily: "Poppins" }}
                >
                  Cancelled
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    color: "#c62828",
                  }}
                >
                  {cancelledAppointments}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  backgroundColor: "#fde2e2",
                  color: "#c62828",
                }}
              >
                <Cancel />
              </Avatar>
            </Box>
          </Paper>
        </Box>

        {/* ===================================================== */}
        {/* NEXT APPOINTMENT */}
        {/* ===================================================== */}

        {nextAppointment && (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              background: "linear-gradient(135deg, #16704f 0%, #10583e 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    fontFamily: "Poppins",
                  }}
                >
                  Next Appointment
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    mt: 0.5,
                    fontFamily: "Poppins",
                  }}
                >
                  {getServiceName(nextAppointment) || "Medical Appointment"}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    opacity: 0.95,
                  }}
                >
                  {getDoctorName(nextAppointment)
                    ? `👨‍⚕️ Dr. ${getDoctorName(nextAppointment)}`
                    : "👨‍⚕️ Medical Doctor"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.7,
                    }}
                  >
                    <CalendarMonth fontSize="small" />
                    <Typography fontSize={14} sx={{ fontFamily: "Poppins" }}>
                      {formatDate(nextAppointment.date)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.7,
                    }}
                  >
                    <AccessTime fontSize="small" />
                    <Typography fontSize={14} sx={{ fontFamily: "Poppins" }}>
                      {formatTime(nextAppointment.time)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() =>
                  document
                    .getElementById("my-bookings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  backgroundColor: "white",
                  color: "#16704f",
                  borderRadius: 3,
                  px: 3,
                  py: 1.3,
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                View Details
              </Button>
            </Box>
          </Paper>
        )}

        {/* ===================================================== */}
        {/* MAIN */}
        {/* ===================================================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "300px 1fr",
            },
            gap: 2,
          }}
        >
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* ================= CALENDAR ================= */}

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
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  Appointment Calendar
                </Typography>

                <Box>
                  <IconButton size="small">
                    <ChevronLeft />
                  </IconButton>

                  <IconButton size="small">
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                align="center"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontFamily: "Poppins",
                }}
              >
                August 2026
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 1,
                  textAlign: "center",
                }}
              >
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <Typography
                      key={day}
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {day}
                    </Typography>
                  ),
                )}

                {Array.from({ length: 31 }, (_, i) => {
                  const dayNumber = i + 1;

                  const hasAppointment = appointments.some((appointment) => {
                    if (!appointment.date) return false;

                    return (
                      new Date(appointment.date).getDate() === dayNumber &&
                      new Date(appointment.date).getMonth() === 7
                    );
                  });

                  return (
                    <Box
                      key={dayNumber}
                      sx={{
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",

                        backgroundColor: hasAppointment
                          ? "#16704f"
                          : "transparent",

                        color: hasAppointment ? "white" : "inherit",

                        fontSize: 13,
                        cursor: "pointer",

                        "&:hover": {
                          backgroundColor: hasAppointment
                            ? "#10583e"
                            : "#e5f4ed",
                        },
                      }}
                    >
                      {dayNumber}
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            {/* ================= PROFILE ================= */}

            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontFamily: "Poppins",
                }}
              >
                My Profile
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 55,
                    height: 55,
                    backgroundColor: "#e5f4ed",
                    color: "#16704f",
                    fontWeight: "bold",
                  }}
                >
                  {currentUser?.name?.charAt(0)?.toUpperCase() || "P"}
                </Avatar>

                <Box>
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    {currentUser?.name || "Patient"}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {currentUser?.email || ""}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  textTransform: "none",
                  color: "#16704f",
                  borderColor: "#16704f",
                  fontFamily: "Poppins",

                  "&:hover": {
                    borderColor: "#10583e",
                    backgroundColor: "#e5f4ed",
                  },
                }}
              >
                Edit Profile
              </Button>
            </Paper>
          </Box>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <Paper
            id="my-bookings"
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* ================= BOOKINGS HEADER ================= */}

            <Box
              sx={{
                p: 3,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
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
                  My Bookings
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  Your booked medical appointments
                </Typography>
              </Box>

              <Box>
                <IconButton>
                  <NotificationsNone />
                </IconButton>

                <IconButton>
                  <Settings />
                </IconButton>
              </Box>
            </Box>

            {/* ================= FILTERS ================= */}

            <Box
              sx={{
                p: 3,
                pb: 1,
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {["All", "Upcoming", "Completed", "Cancelled"].map((item) => (
                <Button
                  key={item}
                  variant={filter === item ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setFilter(item)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontWeight: 600,

                    ...(filter === item
                      ? {
                          backgroundColor: "#16704f",
                          "&:hover": {
                            backgroundColor: "#10583e",
                          },
                        }
                      : {
                          color: "#16704f",
                          borderColor: "#d0ddd7",
                        }),
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* ================= APPOINTMENTS ================= */}

            <Box
              sx={{
                px: 3,
                pb: 3,
                pt: 2,
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    py: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "#16704f",
                    }}
                  />
                </Box>
              ) : appointments.length === 0 ? (
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                  }}
                >
                  <MedicalServices
                    sx={{
                      fontSize: 60,
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
                    No appointments yet
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      fontFamily: "Poppins",
                    }}
                  >
                    You don't have any booked appointments.
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => navigate("/user/services")}
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
                    Browse Services
                  </Button>
                </Box>
              ) : filteredAppointments.length === 0 ? (
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                  }}
                >
                  <CalendarMonth
                    sx={{
                      fontSize: 55,
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
                    No {filter.toLowerCase()} appointments
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    There are no appointments in this category.
                  </Typography>
                </Box>
              ) : (
                filteredAppointments.map((appointment, index) => {
                  const serviceName = getServiceName(appointment);

                  const doctorName = getDoctorName(appointment);

                  const price = getPrice(appointment);

                  const status = getStatus(appointment);

                  const statusStyle = getStatusStyle(status);

                  return (
                    <Box
                      key={appointment._id || index}
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 2,
                        p: 2.5,
                        borderRadius: 3,

                        backgroundColor: index === 0 ? "#e5f4ed" : "#f8f9fb",

                        borderLeft: "5px solid #16704f",

                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },

                        transition: "0.2s",

                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                        },
                      }}
                    >
                      {/* DATE */}

                      <Box
                        sx={{
                          minWidth: 130,
                        }}
                      >
                        <Typography
                          fontWeight="bold"
                          fontSize={14}
                          sx={{
                            fontFamily: "Poppins",
                          }}
                        >
                          {formatDate(appointment.date)}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mt: 0.5,
                          }}
                        >
                          <AccessTime
                            sx={{
                              fontSize: 15,
                            }}
                          />

                          {formatTime(appointment.time)}
                        </Typography>
                      </Box>

                      {/* DETAILS */}

                      <Box
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        {serviceName && (
                          <Box sx={{ mb: 0.8 }}>
                            <Typography
                              fontWeight="bold"
                              sx={{
                                fontFamily: "Poppins",
                              }}
                            >
                              {serviceName}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontFamily: "Poppins",
                              }}
                            >
                              Medical Service
                            </Typography>
                          </Box>
                        )}

                        {doctorName && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: serviceName ? 0.5 : 0,
                              fontFamily: "Poppins",
                              fontWeight: 500,
                            }}
                          >
                            👨‍⚕️ Doctor: {doctorName}
                          </Typography>
                        )}

                        {!serviceName && !doctorName && (
                          <Typography
                            fontWeight="bold"
                            sx={{
                              fontFamily: "Poppins",
                            }}
                          >
                            Medical Appointment
                          </Typography>
                        )}

                        {price !== null && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 0.5,
                              fontFamily: "Poppins",
                            }}
                          >
                            Price: ${price}
                          </Typography>
                        )}
                      </Box>

                      {/* STATUS */}

                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          alignSelf: {
                            xs: "flex-start",
                            sm: "center",
                          },

                          backgroundColor: statusStyle.backgroundColor,

                          color: statusStyle.color,

                          fontFamily: "Poppins",

                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  );
                })
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
