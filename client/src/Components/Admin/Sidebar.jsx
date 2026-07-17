import { Box, List, ListItemButton } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
export default function Sidebar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Box>
        <List>
          {currentUser.role === "admin" ? (
            <>
              <ListItemButton onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/manage-users")}>
                Manage users
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/manage-menu")}>
                Manage menu
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/admin/manage-categories")}
              >
                Manage categories
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/manage-shifts")}>
                Manage Shifts
              </ListItemButton>
              <ListItemButton>Manage profile</ListItemButton>
              <ListItemButton
                onClick={() => navigate("/admin/manage-feedbacks")}
              >
                Manage messages
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton onClick={() => navigate("/employee/dashboard")}>
                Dashboard
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/employee/manage-users")}
              >
                Manage users
              </ListItemButton>
              <ListItemButton>Manage profile</ListItemButton>
            </>
          )}
          <ListItemButton>logout</ListItemButton>
        </List>
      </Box>
    </>
  );
}
