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

  const isLoggedIn = currentUser && Object.keys(currentUser).length > 0;

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
        }}
      >
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

            flexWrap: {
              xs: "wrap",
              sm: "wrap",
              md: "nowrap",
              lg: "nowrap",
            },
          }}
        >
          {/* ================= LOGO ================= */}

          <Box
            sx={{
              justifyContent: "center",
              gap: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(isLoggedIn ? "/user/home" : "/")}
          >
            <img
              src={logo}
              alt="Clinic Jo Logo"
              style={{
                width: "60px",
                height: "45px",
                borderRadius: "50%",
              }}
            />

            <Typography
              sx={{
                fontWeight: 550,
                fontFamily: "Poppins",
              }}
              variant="h6"
            >
              Clinic Jo
            </Typography>
          </Box>

          {/* ================= MAIN NAVIGATION ================= */}

          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,

              flexWrap: {
                xs: "wrap",
                sm: "wrap",
                md: "nowrap",
                lg: "nowrap",
              },
            }}
          >
            {/* HOME */}

            <ListItemButton
              onClick={() => navigate(isLoggedIn ? "/user/home" : "/")}
              sx={{
                borderRadius: 2,
                fontFamily: "Poppins",
              }}
            >
              Home
            </ListItemButton>

            {/* ABOUT */}

            <ListItemButton
              onClick={() => navigate(isLoggedIn ? "/user/about" : "/About")}
              sx={{
                borderRadius: 2,
                fontFamily: "Poppins",
              }}
            >
              About
            </ListItemButton>

            {/* SERVICES */}

            <ListItemButton
              onClick={() =>
                navigate(isLoggedIn ? "/user/services" : "/services")
              }
              sx={{
                borderRadius: 2,
                fontFamily: "Poppins",
              }}
            >
              Services
            </ListItemButton>

            {/* DOCTORS */}

            <ListItemButton
              onClick={() =>
                navigate(isLoggedIn ? "/user/doctors" : "/Doctors")
              }
              sx={{
                borderRadius: 2,
                fontFamily: "Poppins",
              }}
            >
              Doctors
            </ListItemButton>
          </List>

          {/* ================= AUTH ================= */}

          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,

              flexWrap: {
                xs: "wrap",
                sm: "wrap",
                md: "nowrap",
                lg: "nowrap",
              },
            }}
          >
            {!isLoggedIn ? (
              <>
                {/* ================= SIGN IN ================= */}

                <ListItemButton
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    py: 1,

                    border: "1px solid #2563EB",
                    color: "#2563EB",

                    fontFamily: "Poppins",

                    "&:hover": {
                      borderColor: "#1D4ED8",
                      backgroundColor: "#EFF6FF",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </ListItemButton>

                {/* ================= SIGN UP ================= */}

                <ListItemButton
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    py: 1,

                    color: "#545555",
                    background: "#e3e7f2",

                    fontFamily: "Poppins",

                    "&:hover": {
                      backgroundColor: "#d8ddea",
                    },
                  }}
                  onClick={() => navigate("/create-account")}
                >
                  Sign Up
                </ListItemButton>
              </>
            ) : (
              <>
                {/* ================= DASHBOARD ================= */}

                <ListItemButton
                  onClick={() => navigate("/user/dashboard")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 2.5,
                    py: 1,

                    color: "#16704f",
                    backgroundColor: "#e5f4ed",

                    fontFamily: "Poppins",
                    fontWeight: 600,

                    "&:hover": {
                      backgroundColor: "#d5eee3",
                    },
                  }}
                >
                  Dashboard
                </ListItemButton>

                {/* ================= LOGOUT ================= */}

                <ListItemButton
                  onClick={() => logout()}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 2.5,
                    py: 1,

                    color: "#545555",

                    fontFamily: "Poppins",

                    "&:hover": {
                      backgroundColor: "#f3f3f3",
                    },
                  }}
                >
                  Logout
                </ListItemButton>
              </>
            )}
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
}
