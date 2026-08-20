import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Box
        sx={{
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar />
      </Box>

      {/* ================= CONTENT ================= */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflow: "auto",
          transition: "all 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
