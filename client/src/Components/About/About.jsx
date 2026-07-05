import { Box, Typography } from "@mui/material";

export default function About() {
  return
  <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: { xs:"wrap" ,sm:"wrap",md:"nowrap",lg:"nowrap"},
        justifyContent: "space-between",
        alignItems:"center"
      }}
    >
      <Typography variant="h4" sx={{ alignItems: "center" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam vitae
        repellat accusantium fuga esse. Tempore consectetur odio quibusdam
        repellendus dicta eius, dolorum, inventore facilis magnam nobis beatae
        architecto, consequuntur aliquid!
      </Typography>
      <Box component={"img"} src="" />
    </Box>
  </>;
}
