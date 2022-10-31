import { Box, Typography } from '@mui/material/';

export default function Logo() {
  return (
    <Box>
      <Typography
        fontFamily={"Monoton"}
        sx={{
          fontSize: {xs:40, sm:70, xl:55}, color:"white"
        }}
      >
        campus.fm
      </Typography>
      <Typography
        noWrap
        fontFamily={"Turret Road"}
        sx={{
          ml: 0.5,
          mt: {xs: -1.7, sm: -2.5, lg: -1.7},
          mb: {xs: 0, sm: 2.5},
          fontSize: {xs: 17, sm: 26, lg: 20},
          fontWeight: "bold",
          color:"white"
        }}
      >
        listen to college radio stations
      </Typography> 
    </Box>
  
  )
}