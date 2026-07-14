import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import Header from "../../Components/Layout/Header"
import Footer from "../../Components/Layout/Footer";
import loginn from "../../assets/login.png";
import login1 from "../../assets/login1.png";
import { useState } from "react";
export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    console.log(formData);
    login(formData);
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${login1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              maxWidth: 1000,
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              bgcolor: "#5dbce4eb",

              // اختياري حتى يكون الصندوق أوضح فوق الخلفية
              bgcolor: "",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                flex: 1,
                bgcolor: "#5dbce4eb",
                color: "white",
                p: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={loginn}
                sx={{
                  width: 320,
                  mb: 3,
                  ml: 14,
                }}
              />

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome to
                <br />
                Healthcare
              </Typography>

              <Typography
                sx={{
                  opacity: 0.9,
                  maxWidth: 280,
                  lineHeight: 1.8,
                }}
              >
                Access your healthcare account and manage your appointments
                quickly and securely.
              </Typography>
            </Box>

            {/* Right Side */}
            <Box
              sx={{
                flex: 1.4,
                p: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                Login
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Login with your email and password.
              </Typography>

              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleLogin}
                sx={{
                  mt: 4,
                  py: 1.5,
                  bgcolor: "#5B4CF0",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": {
                    bgcolor: "#4839d6",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
