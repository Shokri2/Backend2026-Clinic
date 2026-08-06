import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Layout/Header";
import { useNavigate } from "react-router-dom";
import {
Container,
Typography,
Grid,
Card,
CardContent,
Button,
TextField,
MenuItem,
Box,
Paper,
Avatar,
Chip,
InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlineOutlined";

export default function Doctors() {
const [doctors, setDoctors] = useState([]);
const [search, setSearch] = useState("");
const [department, setDepartment] = useState("");
const navigate = useNavigate();
const fetchDoctors = async () => {
try {
const response = await axios.get(
`http://localhost:3000/api/doctors?search=${search}&department=${department}`
);


  setDoctors(response.data);
} catch (error) {
  console.error("Error loading doctors:", error);
}


};

useEffect(() => {
fetchDoctors();
}, [search, department]);

return (
  <>
    <Header />

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#b2f7f78c",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* عنوان الصفحة */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              color: "#165c44e4",
              mb: 1.5,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Meet Our Doctors{" "}
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              maxWidth: 620,
              mx: "auto",
              lineHeight: 1.8,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Meet our experienced doctors and choose the specialist that best
            fits your healthcare needs.
          </Typography>
        </Box>

        {/* البحث والفلترة */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              md: 2.5,
            },
            mb: 5,

            backgroundColor: "#acf9f931",

            boxShadow: "0 8px 25px rgba(18, 55, 42, 0.06)",
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
              label="Search by doctor name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "#16704f",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            <TextField
              select
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              sx={{
                width: {
                  xs: "100%",
                  md: 280,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            >
              <MenuItem value="">All Departments</MenuItem>

              <MenuItem value="Cardiology">Cardiology</MenuItem>

              <MenuItem value="Dentistry">Dentistry</MenuItem>

              <MenuItem value="Neurology">Neurology</MenuItem>

              <MenuItem value="Pediatrics">Pediatrics</MenuItem>
            </TextField>
          </Box>
        </Paper>

        {/* قائمة الدكاترة */}
        <Grid container spacing={4}>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                key={doctor._id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #e1ebe6",
                    boxShadow: "0 6px 25px rgba(20, 60, 45, 0.08)",
                    transition: "all 0.3s ease",

                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 18px 40px rgba(20, 60, 45, 0.16)",
                    },
                  }}
                >
                  {/* صورة الدكتور */}
                  {doctor.image ? (
                    <Box
                      component="img"
                      src={doctor.image}
                      alt={doctor.name}
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#e8f3ee",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 90,
                          height: 90,
                          fontSize: 35,
                          fontWeight: 700,
                          backgroundColor: "#16704f",
                        }}
                      >
                        {doctor.name?.charAt(0)}
                      </Avatar>
                    </Box>
                  )}

                  <CardContent
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    {/* اسم الدكتور */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 800,
                        color: "#12372A",
                        mb: 0.8,
                      }}
                    >
                      {doctor.name}
                    </Typography>

                    {/* التخصص */}
                    <Chip
                      label={doctor.department}
                      size="small"
                      sx={{
                        width: "fit-content",
                        backgroundColor: "#e5f4ed",
                        color: "#16704f",
                        fontWeight: 700,
                        borderRadius: 2,
                      }}
                    />

                    {/* الخبرة */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1.5,
                      }}
                    >
                      <WorkOutlineIcon
                        fontSize="small"
                        sx={{
                          color: "#16704f",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#667085",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {doctor.experience} Years Experience
                      </Typography>
                    </Box>

                    {/* وصف الدكتور */}
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        lineHeight: 1.6,
                        color: "#667085",
                        flexGrow: 1,
                        fontSize: "14px",
                      }}
                    >
                      {doctor.about}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        const user = localStorage.getItem("currentUser");

                        if (user) {
                          // مسجل دخول
                          navigate(`/appointment/${doctor._id}`);
                        } else {
                          // غير مسجل
                          navigate("/login");
                        }
                      }}
                      sx={{
                        mt: 2,
                        py: 1,
                        borderRadius: 3,
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        textTransform: "none",
                        backgroundColor: "#16704f",

                        "&:hover": {
                          backgroundColor: "#10583e",
                        },
                      }}
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#667085",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                No Doctors Found
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  </>
);
}
