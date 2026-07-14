
import { Box, Container, Typography, IconButton } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#0F172A",
        color: "#fff",
        mt: 8,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Social Icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
       
        </Box>

        {/* Text */}
        <Typography
          textAlign="center"
          color="#cbd5e1"
          sx={{
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Your Health Our Priority — Providing trusted healthcare with
          experienced doctors and modern medical services.
        </Typography>

        {/* Copyright */}
        <Typography
          textAlign="center"
          sx={{
            mt: 2,
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
           2026 Clinic JO. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
