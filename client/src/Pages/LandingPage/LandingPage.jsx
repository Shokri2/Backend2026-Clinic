import { Container } from "@mui/material";
import Header from "../../Components/Layout/Header";
import About from "../../Components/About/About";
import Contact from "../../Components/Contact/Contact";
import Categories from "../../Components/Categories/Categories";
export default function LandingPage() {
  return (
    <>
      <Header />

      <Container sx={{ my: 3, alignContent: "center" }}>
        <About />
        <Contact />
        <Categories />
      </Container>
    </>
  );
}
