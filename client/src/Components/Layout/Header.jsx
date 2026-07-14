import {
  Box,
  AppBar,
  ListItemButton,
  Toolbar,
  List,
  Typography,
} from "@mui/material";
import "@fontsource/poppins";
import "@fontsource/poppins/700.css";
import logo from "../../assets/loog.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../../Hooks/UseAuth";
import { UserContext } from "../../Context/UserContext";
export default function Header() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            py: 2,
            bgcolor: "white",
            color: "black",
            alignItems: "center",
            fontFamily: "Poppins",

            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              gap: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "60px",
                height: "45px",
                borderRadius: "50%",
              }}
            />
            <Typography sx={{ fontWeight: 550 }} variant="h6">
              Clinic Jo
            </Typography>
          </Box>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
            }}
          >
            <ListItemButton onClick={() => navigate("/")}>Home</ListItemButton>
            <ListItemButton onClick={() => navigate("/About")}>About</ListItemButton>
            <ListItemButton >Services</ListItemButton>
            <ListItemButton>Doctors</ListItemButton>
          </List>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
            }}
          >
            {!currentUser || Object.keys(currentUser).length === 0 ? (
              <>
                <ListItemButton
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    py: 1,

                    borderColor: "#2563EB",
                    color: "#2563EB",
                    "&:hover": {
                      borderColor: "#1D4ED8",
                      backgroundColor: "#EFF6FF",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </ListItemButton>
                <ListItemButton
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    py: 1,
                    color: "#545555",
                    background: "#e3e7f2",
                  }}
                  onClick={() => navigate("/create-account")}
                >
                  Sign Up
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton onClick={() => logout()}>Logout</ListItemButton>
              </>
            )}
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
}
