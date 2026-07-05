import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/UseAuth";
export function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegister = () => {
    register(formData);
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
          <TextField label="Name" />
          <TextField label="Email" type="email" />
          <TextField label="Password" type="password" />
          <TextField label="confim Password" type="password" />
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
