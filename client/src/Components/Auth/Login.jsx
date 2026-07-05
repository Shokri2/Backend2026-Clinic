import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
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
      <Container sx={{ m: "auto" }}>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            p: 4,
            my: "auto",
          }}
        >
          <Typography variant="h3">Login Into your Account</Typography>
          <Typography variant="caption">complete your journy!</Typography>

          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
}
