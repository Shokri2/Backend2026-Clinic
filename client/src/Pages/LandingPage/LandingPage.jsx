import { Box } from "@mui/material";
import Footer from "../../Components/Layout/Footer";

import Contact from "../../Components/Contact/Contact";
import Categories from "../../Components/Categories/Categories";
import Home from "../Home/Home";

export default function LandingPage() {
  return (
    <>
      <Box sx={{ alignContent: "center" }}>
        <Home />
      </Box>

      <Footer />
    </>
  );
}
