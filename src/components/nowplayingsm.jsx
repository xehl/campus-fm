import { Paper, CardMedia, Box, Typography } from '@mui/material'

export default function NowPlayingSmall({ playing }) {

  return (
    <Box sx={{ width: { xs: "100%", md: 580, xl: 660 }, mt: 2 }} >
      <Paper id="mobile-now-playing" elevation={3} sx={{ display: {xs: "flex", sm: "flex", md: "none"}, width:"90vw", margin: "auto", mt: 1, mb: 3, alignItems: "center", justifyContent: "flex-start", borderRadius: '12px', height: { xs: 80, xl: 120 } }}>
        <Box sx={{ height: 80, width: 80 }}>
        {playing && <CardMedia
          component="img"
          sx={{ width: 60, borderRadius: "10px", margin:"10px", objectFit:"contain" }}
          image={playing.station_image}
          alt={playing.call_sign}
          margin="auto"
          />}
        </Box>
        <Typography fontFamily={"Share Tech Mono"} fontSize={"1.2rem"} sx={{ml:1}}>
          Playing: {playing ? <>{playing.call_sign} {playing.broadcast_frequency}</> : "None"}
        </Typography>
      </Paper>
    </Box>
  )
}