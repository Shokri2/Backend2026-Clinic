import { Box } from "@mui/material";
import Header from "../../Components/Layout/Header";
import Footer from "../../Components/Layout/Footer";

import Contact from "../../Components/Contact/Contact";
import Categories from "../../Components/Categories/Categories";
import Home from "../Home/Home";

export default function LandingPage() {
  return (
    <>
      <Header />

      <Box sx={{ alignContent: "center" }}>
        <Home />
      </Box>

      <Footer />
    </>
  );
}
