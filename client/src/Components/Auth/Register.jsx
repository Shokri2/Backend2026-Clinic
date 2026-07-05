import { Container, Paper, TextField, Button, Typography,Box } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/UseAuth";
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
          <Typography variant="h3">Create New Account</Typography>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
          <TextField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => handleRegister()}
          >
            Register
          </Button>
        </Paper>
      </Container>
    </>
  );
}
