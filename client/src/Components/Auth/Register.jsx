import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/UseAuth";
import Header from "../Layout/Header";
import registerBg from "../../assets/registerBg.png";
export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegister = () => {
    register(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Create Account
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
              Create your account to access our healthcare services.
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: "#5B4CF0",
                borderRadius: 2,
                textTransform: "none",
                fontSize: 17,
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#4A3DE0",
                },
              }}
              onClick={handleRegister}
            >
              Create Account
            </Button>

            <Typography
              sx={{
                mt: 3,
                color: "text.secondary",
              }}
            >
              Already have an account?
              <Typography
                component="span"
                sx={{
                  color: "#5B4CF0",
                  fontWeight: "bold",
                  cursor: "pointer",
                  ml: 1,
                }}
              >
                Login
              </Typography>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
