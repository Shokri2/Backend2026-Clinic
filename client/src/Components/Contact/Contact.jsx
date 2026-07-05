import { Typography, Button, CardContent, Card } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Card
        sx={{
          my: 4,
          m: "auto",
          justifyContent: "center",
          width: "70%",
          alignContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4">Contact Us </Typography>
          <Typography className="caption">reach out</Typography>
          <Button variant="contained">Contcat Us</Button>
        </CardContent>
      </Card>
    </>
  );
}
