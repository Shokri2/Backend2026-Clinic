import { Box, AppBar, ListItemButton, Toolbar, List } from "@mui/material";
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
            p: 2,
            m: 2,
            alignItems: "center",
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
          }}
        >
          <Box>
            <Typography variant="h2">Logo</Typography>
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
            <ListItemButton>About</ListItemButton>
            <ListItemButton>Contact</ListItemButton>
            

            {!currentUser || Object.keys(currentUser).length === 0 ? (
              <>
                <ListItemButton onClick={() => navigate("/login")}>
                  Login
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/create-account")}>
                  Register
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
