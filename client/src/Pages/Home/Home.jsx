import { Container, Typography } from "@mui/material";
import Haeder from "../../Components/Layout/Haeder";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <>
      <Haeder />
      <Container sx={{ m: "auto" }}>
        {/* menu items */}
        <Typography variant="h2">Welcome, {currentUser?.name}</Typography>
      </Container>
    </>
  );
}
