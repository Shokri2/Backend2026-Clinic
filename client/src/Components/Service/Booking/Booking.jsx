import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import bookingBg from "../../../assets/bookingBg.png";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";

import toast from "react-hot-toast";
import { UserContext } from "../../../Context/UserContext";

export default function Booking() {
  // =====================================================
  // PARAMS
  // =====================================================

  const { serviceId, doctorId } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  // =====================================================
  // STATES
  // =====================================================

  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // =====================================================
  // CHECK LOGIN
  // =====================================================

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // =====================================================
  // LOAD SERVICE / DOCTOR
  // =====================================================

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        setLoading(true);

        // =================================================
        // SERVICE BOOKING
        // /user/booking/:serviceId
        // =================================================

        if (serviceId) {
          console.log("Loading service:", serviceId);

          const response = await axios.get(
            "http://localhost:3000/api/services",
          );

          const selectedService = response.data.find(
            (item) => String(item._id) === String(serviceId),
          );

          if (!selectedService) {
            toast.error("Service not found");

            setService(null);
            setDoctor(null);

            return;
          }

          console.log("Selected service:", selectedService);

          setService(selectedService);
          setDoctor(null);

          return;
        }

        // =================================================
        // DOCTOR BOOKING
        // /user/booking/doctor/:doctorId
        // =================================================

        if (doctorId) {
          console.log("Loading doctor:", doctorId);

          const response = await axios.get(
            `http://localhost:3000/api/doctors/${doctorId}`,
          );

          console.log("Selected doctor:", response.data);

          setDoctor(response.data);
          setService(null);

          return;
        }

        toast.error("No service or doctor selected");

        setService(null);
        setDoctor(null);
      } catch (error) {
        console.error("Error loading booking data:", error);

        toast.error(
          error.response?.data?.message || "Unable to load booking information",
        );

        setService(null);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadBookingData();
    } else {
      setLoading(false);
    }
  }, [serviceId, doctorId, currentUser]);

  // =====================================================
  // HANDLE BOOKING
  // =====================================================

  const handleBooking = async () => {
    // -----------------------------------------------------
    // CHECK LOGIN
    // -----------------------------------------------------

    if (!currentUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // -----------------------------------------------------
    // CHECK TOKEN
    // -----------------------------------------------------

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    // -----------------------------------------------------
    // CHECK DATE
    // -----------------------------------------------------

    if (!date) {
      toast.error("Please select appointment date");
      return;
    }

    // -----------------------------------------------------
    // CHECK TIME
    // -----------------------------------------------------

    if (!time) {
      toast.error("Please select appointment time");
      return;
    }

    // -----------------------------------------------------
    // CHECK SERVICE / DOCTOR
    // -----------------------------------------------------

    if (!service && !doctor) {
      toast.error("Please select a service or doctor");
      return;
    }

    try {
      setBookingLoading(true);

      // ===================================================
      // USER ID
      // ===================================================

      const userId = currentUser._id || currentUser.id;

      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      // ===================================================
      // APPOINTMENT DATA
      // ===================================================

      const appointmentData = {
        user: userId,
        date: date,
        time: time,
        status: "Booked",
      };

      // ===================================================
      // SERVICE BOOKING
      // ===================================================

      if (service) {
        appointmentData.service = service._id;
      }

      // ===================================================
      // DOCTOR BOOKING
      // ===================================================

      if (doctor) {
        appointmentData.doctor = doctor._id;
      }

      console.log("=================================");
      console.log("TOKEN EXISTS:", !!token);
      console.log("USER ID:", userId);
      console.log("SENDING APPOINTMENT:");
      console.log(appointmentData);
      console.log("=================================");

      // ===================================================
      // SEND TO BACKEND
      // ===================================================

      const response = await axios.post(
        "http://localhost:3000/api/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Appointment created:", response.data);

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success("Appointment booked successfully!");

      // ===================================================
      // DASHBOARD
      // ===================================================

      navigate("/user/dashboard");
    } catch (error) {
      console.error("=================================");
      console.error("BOOKING ERROR:", error);
      console.error("BACKEND ERROR:", error.response?.data);
      console.error("STATUS:", error.response?.status);
      console.error("=================================");

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");

        localStorage.removeItem("token");

        navigate("/login");

        return;
      }

      toast.error(
        error.response?.data?.message || "Failed to book appointment",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.75),
              rgba(255,255,255,0.75)
            ),
            url(${bookingBg})
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            sx={{
              color: "#16704f",
              mb: 2,
            }}
          />

          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#12372A",
              fontWeight: 600,
            }}
          >
            Loading booking information...
          </Typography>
        </Box>
      </Box>
    );
  }

  // =====================================================
  // NOTHING FOUND
  // =====================================================

  if (!service && !doctor) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#12372A",
            fontFamily: "Poppins",
          }}
        >
          Booking information not found
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/user/services")}
          sx={{
            backgroundColor: "#16704f",

            "&:hover": {
              backgroundColor: "#10583e",
            },
          }}
        >
          Back
        </Button>
      </Box>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        py: { xs: 4, md: 8 },

        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.72),
            rgba(255,255,255,0.72)
          ),
          url(${bookingBg})
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(5px)",
          }}
        >
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <Box
            sx={{
              textAlign: "center",
              mb: 5,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                fontFamily: "Poppins",
                mb: 1,
              }}
            >
              Book Your Appointment
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontFamily: "Poppins",
              }}
            >
              Choose your preferred date and time for your appointment
            </Typography>
          </Box>

          {/* ================================================= */}
          {/* BOOKING TARGET */}
          {/* ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              borderColor: "#dce8e2",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                mb: 2,
                fontFamily: "Poppins",
              }}
            >
              {service ? "Selected Service" : "Selected Doctor"}
            </Typography>

            {/* SERVICE */}

            {service && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#16704f",
                      fontSize: "1.15rem",
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
                      fontFamily: "Poppins",
                    }}
                  >
                    Medical Service
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#16704f",
                    fontSize: "1.1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  ${service.price}
                </Typography>
              </Box>
            )}

            {/* DOCTOR */}

            {doctor && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#16704f",
                    fontSize: "1.15rem",
                    fontFamily: "Poppins",
                  }}
                >
                  {doctor.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    fontFamily: "Poppins",
                  }}
                >
                  Department: {doctor.department}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    fontFamily: "Poppins",
                  }}
                >
                  {doctor.experience} Years Experience
                </Typography>
              </Box>
            )}
          </Paper>

          {/* ================================================= */}
          {/* PATIENT */}
          {/* ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              borderColor: "#dce8e2",
              backgroundColor: "#f8fbf9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                mb: 1,
                fontFamily: "Poppins",
              }}
            >
              Patient Information
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "text.secondary",
              }}
            >
              Name: <strong>{currentUser?.name}</strong>
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "text.secondary",
              }}
            >
              Email: <strong>{currentUser?.email}</strong>
            </Typography>
          </Paper>

          {/* ================================================= */}
          {/* DATE */}
          {/* ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              borderColor: "#dce8e2",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                mb: 0.5,
                fontFamily: "Poppins",
              }}
            >
              Appointment Date
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
                fontFamily: "Poppins",
              }}
            >
              Select the day you would like to visit the clinic.
            </Typography>

            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              slotProps={{
                htmlInput: {
                  min: new Date().toISOString().split("T")[0],
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          {/* ================================================= */}
          {/* TIME */}
          {/* ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              borderColor: "#dce8e2",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                mb: 0.5,
                fontFamily: "Poppins",
              }}
            >
              Appointment Time
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
                fontFamily: "Poppins",
              }}
            >
              Choose a time between 8:00 AM and 4:00 PM.
            </Typography>

            <TextField
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              slotProps={{
                htmlInput: {
                  min: "08:00",
                  max: "16:00",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          <Divider sx={{ my: 4 }} />

          {/* ================================================= */}
          {/* SUMMARY */}
          {/* ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              borderColor: "#dce8e2",
              backgroundColor: "#f8fbf9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#12372A",
                mb: 2,
                fontFamily: "Poppins",
              }}
            >
              Appointment Summary
            </Typography>

            {/* SERVICE */}

            {service && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins" }}>
                    Service
                  </Typography>

                  <Typography
                    fontWeight={700}
                    sx={{
                      fontFamily: "Poppins",
                      color: "#16704f",
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography
                    fontWeight={600}
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    Appointment Fee
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#16704f",
                      fontSize: "1.2rem",
                      fontFamily: "Poppins",
                    }}
                  >
                    ${service.price}
                  </Typography>
                </Box>
              </>
            )}

            {/* DOCTOR */}

            {doctor && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins" }}>Doctor</Typography>

                  <Typography
                    fontWeight={700}
                    sx={{
                      fontFamily: "Poppins",
                      color: "#16704f",
                    }}
                  >
                    {doctor.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins" }}>
                    Department
                  </Typography>

                  <Typography
                    fontWeight={700}
                    sx={{
                      fontFamily: "Poppins",
                      color: "#16704f",
                    }}
                  >
                    {doctor.department}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins" }}>
                    Appointment Type
                  </Typography>

                  <Typography
                    fontWeight={700}
                    sx={{
                      fontFamily: "Poppins",
                      color: "#16704f",
                    }}
                  >
                    Doctor Appointment
                  </Typography>
                </Box>
              </>
            )}

            {/* DATE */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Date</Typography>

              <Typography
                fontWeight={700}
                sx={{
                  fontFamily: "Poppins",
                  color: "#16704f",
                }}
              >
                {date || "Not selected"}
              </Typography>
            </Box>

            {/* TIME */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Time</Typography>

              <Typography
                fontWeight={700}
                sx={{
                  fontFamily: "Poppins",
                  color: "#16704f",
                }}
              >
                {time || "Not selected"}
              </Typography>
            </Box>
          </Paper>

          {/* ================================================= */}
          {/* CONFIRM */}
          {/* ================================================= */}

          <Button
            fullWidth
            variant="contained"
            disabled={!date || !time || bookingLoading}
            onClick={handleBooking}
            sx={{
              py: 1.6,
              borderRadius: 2,
              backgroundColor: "#16704f",
              fontWeight: 600,
              fontSize: "1rem",
              fontFamily: "Poppins",

              "&:hover": {
                backgroundColor: "#10583e",
              },

              "&.Mui-disabled": {
                backgroundColor: "#b8c9c1",
                color: "#ffffff",
              },
            }}
          >
            {bookingLoading ? (
              <>
                <CircularProgress
                  size={22}
                  sx={{
                    color: "white",
                    mr: 1,
                  }}
                />
                Booking...
              </>
            ) : (
              "Confirm Appointment"
            )}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
