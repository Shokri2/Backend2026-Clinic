import { Typography, Button, CardContent, Card } from "@mui/material";

export default function Contact() {
  return(
  <>
    <Card>
      <CardContent sx={{mt:4 , my:"auto" , justifyContent :"center" }}>
        <Typography variant="h4">Contact Us </Typography>
        <Typography className="caption">reach out</Typography>
        <Button variant="contained">Contcat Us</Button>
      </CardContent>
    </Card>
  </>);
}
