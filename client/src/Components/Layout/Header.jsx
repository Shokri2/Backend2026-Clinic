import {
  Box,
  AppBar,
 
  ListItemButton,
  Toolbar,
  List,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate =useNavigate()
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
          <Box>logo</Box>
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
            <ListItemButton>Login</ListItemButton>
            <ListItemButton onClick={() => navigate("/create-account")}>
              Register
            </ListItemButton>
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
}
