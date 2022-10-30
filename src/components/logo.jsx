import { Box, Typography } from '@mui/material/';

export default function Logo() {
  return (
    <Box sx={{ width: {xs: "80vw", lg: "auto"}, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography
        fontFamily={"Monoton"}
        sx={{
          fontSize: {xs:"45px", sm:"80px", xl:"55px"}
        }}
      >
        campus.fm
      </Typography>
      <Typography
        noWrap
        fontFamily={"Turret Road"}
        sx={{
          marginTop: {xs:-1.7, sm:-3, xl:-1.7},
          marginBottom: 2.5,
          fontSize: {xs:"20px", sm:"35px", xl:"20px"},
          fontWeight: "bold",
        }}
      >
        listen to college radio stations
      </Typography>
    </Box>
  )
}