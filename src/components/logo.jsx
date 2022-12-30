import { Box, Typography } from '@mui/material/';

export default function Logo() {
  return (
    <Box>
      <Typography
        noWrap
        fontFamily={"Monoton"}
        sx={{
          fontSize: {xs:40, sm:70, xl:55}, color:"white"
        }}
      >
        campus fm
      </Typography>
      <Typography
        noWrap
        variant="h1"
        fontFamily={"Turret Road"}
        sx={{
          ml: 0.5,
          mt: {xs: -1.3, sm: -2.5, lg: -1.7},
          mb: {xs: 0.3, sm: 2.5},
          fontSize: { xs: 19, sm: 26, lg: 23 },
          textAlign: { xs: "center", lg: "left"},
          fontWeight: "bold",
          color:"white"
        }}
      >
        listen to college radio stations
      </Typography> 
    </Box>
  
  )
}