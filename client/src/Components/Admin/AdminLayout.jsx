import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flexGrow: 1,
            position: "sticky",
            height: "100vh",
            bgcolor: "beige",
            maxWidth: "350px",
            overflow: "scroll",
          }}
        >
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 4, height: "100vh", overflow: "scroll" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
