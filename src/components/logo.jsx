import { Box, Typography } from '@mui/material/';

export default function Logo() {
  return (
    <Box>
      <Typography
        fontFamily={"Monoton"}
        sx={{
          fontSize: {xs:"45px", sm:"80px", xl:"55px"}
        }}
        // click on logo to toggle static (debugging)
        // onClick={() => {
        //   playStatic ? setPlayStatic(false) : setPlayStatic(true);
        // }}
      >
        campus.fm
      </Typography>
      <Typography
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