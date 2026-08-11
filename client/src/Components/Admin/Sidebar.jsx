import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#12372A",
        color: "white",
        p: 2,
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate("/admin/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/manage-users")}>
          <ListItemText primary="Manage Users" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/manage-doctors")}>
          <ListItemText primary="Manage Doctors" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/manage-services")}>
          <ListItemText primary="Manage Services" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/manage-appointments")}>
          <ListItemText primary="Manage Appointments" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Manage Profile" />
        </ListItemButton>
      </List>
    </Box>
  );
}
