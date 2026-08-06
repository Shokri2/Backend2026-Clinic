import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";

import Header from "../../Components/Layout/Header";
import servicesBg from "../../assets/servicesBg.png";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          height: "550px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={servicesBg}
          alt="Services Background"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",

            animation: "zoomEffect 12s infinite alternate",

            "@keyframes zoomEffect": {
              "0%": {
                transform: "scale(1)",
              },
              "100%": {
                transform: "scale(1.08)",
              },
            },
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.18)",
          }}
        />

        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            zIndex: 2,
            color: "white",
            fontWeight: 700,
            fontFamily: "Poppins",
            textAlign: "center",
            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          Our Services
        </Typography>
      </Box>

      {/* Services Cards */}
      <Container
        sx={{
          mt: 6,
          mb: 6,
        }}
      >
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid
              key={service._id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,

                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000${service.image}`}
                  alt={service.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    textAlign: "center",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      minHeight: "50px",
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                    }}
                  >
                    Price: ${service.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
