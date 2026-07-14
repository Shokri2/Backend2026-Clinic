import { Container, Typography, Stack, Box, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// swiper image
import hero1 from "../../assets/hero1.png";
import hero3 from "../../assets/hero3.png";
import hero4 from "../../assets/hero4.png";
import hero5 from "../../assets/hero5.png";
// whyChooseUs
import whyChooseUs from "../../assets/whyChooseUs.png";
// steps image
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import step4 from "../../assets/step4.png";
import step5 from "../../assets/step5.png";
import step6 from "../../assets/step6.png";

const slides = [
  {
    image: hero1,
    showButtons: true,
  },
  {
    image: hero3,
  },
  {
    image: hero4,
  },
  {
    image: hero5,
    showButtons: false,
  },
];

export default function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Container maxWidth="xl">
                <Box
                  sx={{
                    maxWidth: 600,
                    color: "#fff",
                  }}
                >
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                      lineHeight: 1.2,
                    }}
                  >
                    {slide.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: 18,
                      lineHeight: 1.8,
                      width: "90%",
                    }}
                  >
                    {slide.desc}
                  </Typography>

                  {slide.showButtons && (
                    <Stack
                      direction="row"
                      spacing={2}
                      mt={5}
                      sx={{
                        mt: 37,
                        mx: 5,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          px: 3,
                          py: 1.5,
                          borderRadius: 2,
                        }}
                      >
                        Book Appointment
                      </Button>

                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          color: "#1b1c1b",
                          borderColor: "#fff",
                          "&:hover": {
                            borderColor: "#fff",
                            backgroundColor: "rgba(255,255,255,.1)",
                          },
                        }}
                      >
                        Our Services
                      </Button>
                    </Stack>
                  )}
                </Box>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          py: 8,
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ width: "100%", color: "#1b1c1b", mt: 7 }}>
          <Typography variant="h3" fontWeight="bold" textAlign="center" mb={6}>
            Why Choose Us
          </Typography>

          <Box
            component="img"
            src={whyChooseUs}
            alt="Why Choose Us"
            sx={{
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          py: 10,
          bgcolor: "#f8fbff",
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" fontWeight="bold" textAlign="center" sx={{color:"black"}} >
            How It Works
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mt: 2,
              mb: 8,
              color: "gray",
              maxWidth: "800px",
              mx: "auto",
              fontSize: 18,
              lineHeight: 1.8,
            }}
          >
            Getting medical care has never been easier. Follow these simple
            steps to create your account, book an appointment, choose your
            preferred doctor, and receive quality healthcare services.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
              },
              gap: 5,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <Box
                key={step}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  textAlign: "center",
                }}
              >
                {/* Number */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "#1976d2",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: 22,
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  {step}
                </Box>

                {/* Image */}
                <Box
                  component="img"
                  src={[step1, step2, step3, step4, step5, step6][step - 1]}
                  sx={{
                    width: 220,
                    height: 220,
                    objectFit: "contain",
                    mb: 3,
                  }}
                />

                {/* Title */}
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  {
                    [
                      "Create Account",
                      "Login",
                      "Choose Doctor",
                      "Book Appointment",
                      "Visit Clinic",
                      "Receive Treatment",
                    ][step - 1]
                  }
                </Typography>

                {/* Description */}
                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  {
                    [
                      "Register your account to access all clinic services.",
                      "Login securely using your email and password.",
                      "Browse doctors and select your preferred specialist.",
                      "Choose the available date and time for your visit.",
                      "Meet your doctor and receive professional healthcare.",
                      "Get your treatment plan and follow-up instructions.",
                    ][step - 1]
                  }
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
     
    </>
  );
}
