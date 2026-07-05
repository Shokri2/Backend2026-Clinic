import { Container } from "@mui/material";
import Header from  "../../Components/Layout/Header"
import About from  "../../Components/About/About"
export default function LandingPage(){
    return (
      <>
        <Header />
        <Container sx={{my:3}}>
          
          <About />
        </Container>
      
      </>
    );
}