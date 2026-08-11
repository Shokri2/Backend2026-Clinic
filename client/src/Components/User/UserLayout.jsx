import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";

export default function UserLayout() {
  const { logout } = useAuth();

  return (
    <>
      {/* User Pages */}
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
