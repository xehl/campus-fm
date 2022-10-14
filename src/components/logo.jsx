import { Box, Typography } from '@mui/material/';

export default function Logo() {
  return (
    <Box>
      <Typography
        fontFamily={"Monoton"}
        sx={{
          fontSize: {xs:"45px", sm:"55px"}
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
          marginTop: -1.7,
          marginBottom: 2.5,
          fontSize: {xs:"20px", sm:"22px"},
          fontWeight: "bold",
        }}
      >
        listen to campus radio stations
      </Typography>
    </Box>
  )
}