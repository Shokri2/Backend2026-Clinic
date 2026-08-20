import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  Dashboard,
  People,
  MedicalServices,
  Event,
  Logout,
  Menu,
  ChevronLeft,
} from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItem = (icon, text, path) => {
    return (
      <Tooltip title={!open ? text : ""} placement="right" arrow>
        <ListItemButton
          onClick={() => navigate(path)}
          sx={{
            borderRadius: 2,
            mb: 1,

            justifyContent: open ? "flex-start" : "center",

            px: open ? 2 : 1.5,

            "&:hover": {
              backgroundColor: "#1b4d3a",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "white",

              minWidth: open ? 40 : 0,

              mr: open ? 1 : 0,

              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>

          {open && (
            <ListItemText
              primary={text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontFamily: "Poppins",
                },
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        width: open ? "260px" : "70px",
        minWidth: open ? "260px" : "70px",

        height: "100vh",

        backgroundColor: "#12372A",

        color: "white",

        p: open ? 2 : 1,

        display: "flex",
        flexDirection: "column",

        boxSizing: "border-box",

        overflow: "hidden",

        transition: "width 0.3s ease, min-width 0.3s ease, padding 0.3s ease",
      }}
    >
      {/* ================= TOGGLE ================= */}

      <Box
        sx={{
          display: "flex",

          justifyContent: open ? "flex-end" : "center",

          alignItems: "center",

          mb: 2,
        }}
      >
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            color: "white",

            "&:hover": {
              backgroundColor: "#1b4d3a",
            },
          }}
        >
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Box>

      {/* ================= MENU ================= */}

      <List
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        {menuItem(<Dashboard />, "Dashboard", "/admin/dashboard")}

        {menuItem(<People />, "Manage Users", "/admin/manage-users")}

        {menuItem(
          <MedicalServices />,
          "Manage Doctors",
          "/admin/manage-doctors",
        )}

        {menuItem(
          <MedicalServices />,
          "Manage Services",
          "/admin/manage-services",
        )}

        {menuItem(
          <Event />,
          "Manage Appointments",
          "/admin/manage-appointments",
        )}
      </List>

      {/* ================= LOGOUT ================= */}

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.2)",
          mb: 1,
        }}
      />

      <List>
        <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,

              color: "#ffb4b4",

              justifyContent: open ? "flex-start" : "center",

              px: open ? 2 : 1.5,

              "&:hover": {
                backgroundColor: "#4a1f1f",
                color: "#ffdddd",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#ffb4b4",

                minWidth: open ? 40 : 0,

                mr: open ? 1 : 0,

                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>

            {open && (
              <ListItemText
                primary="Logout"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily: "Poppins",
                  },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );
}
