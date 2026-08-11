import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";

import banner from "../../assets/About.png";
import story1 from "../../assets/story1.png";
import story2 from "../../assets/story2.png";
import story3 from "../../assets/story3.png";

import Footer from "../Layout/Footer";

export default function About() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert("Message sent successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* ================= BANNER ================= */}

      <Box
        sx={{
          height: "550px",
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          inset: 0,
          bgcolor: "rgba(0,0,0,.35)",
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" fontWeight="bold" color="white">
            About Us
          </Typography>
        </Box>
      </Box>

      {/* ================= STORY ================= */}

      <Container sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
          Our Story
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 6,
            lineHeight: 2,
          }}
        >
          At Clinic Jo we are committed to providing exceptional healthcare
          services through advanced medical technology and experienced doctors
          Our mission is to improve the health and well-being of every patient
          by offering compassionate reliable and personalized care in a
          comfortable environment
        </Typography>

        {/* ================= CARDS ================= */}

        <Grid container spacing={2} sx={{ mx: 2.2 }}>
          {[{ img: story1 }, { img: story3 }, { img: story2 }].map(
            (item, index) => (
              <Grid item xs={12} md={4} key={index}>
                {index === 1 ? (
                  <Box
                    component="img"
                    src={item.img}
                    sx={{
                      width: "100%",
                      height: 240,
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia component="img" image={item.img} height="240" />
                  </Card>
                )}
              </Grid>
            ),
          )}
        </Grid>
      </Container>

      {/* ================= CONTACT ================= */}

      <Box
        sx={{
          bgcolor: "#f8fafc",
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={8}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            {/* ================= LEFT SIDE ================= */}

            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                Contact Us
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  mb: 5,
                  fontSize: "17px",
                }}
              >
                We are here to help you with your healthcare needs. Feel free to
                reach out anytime.
              </Typography>

              {/* PHONE */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  fontWeight="bold"
                >
                  PHONE
                </Typography>

                <Typography sx={{ mt: 1 }}>+962 7 9000 0000</Typography>
              </Box>

              {/* EMAIL */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  fontWeight="bold"
                >
                  EMAIL
                </Typography>

                <Typography color="text.secondary">
                  clinicjo@gmail.com
                </Typography>
              </Box>

              {/* ADDRESS */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  fontWeight="bold"
                >
                  ADDRESS
                </Typography>

                <Typography sx={{ mt: 1 }}>Amman, Jordan</Typography>
              </Box>
            </Grid>

            {/* ================= RIGHT SIDE ================= */}

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 5,
                  borderRadius: 4,
                }}
              >
                <Grid container spacing={3}>
                  {/* FULL NAME */}

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* EMAIL */}

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* PHONE */}

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* SUBJECT */}

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* MESSAGE */}

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* SEND BUTTON */}

                  <Grid size={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      sx={{
                        py: 1.6,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}
