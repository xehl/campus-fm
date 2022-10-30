import { CardMedia, Box, Typography } from '@mui/material'

export default function NowPlayingSmall({ playing }) {

  return (
    <Box sx={{ width: { xs: "100%", md: 580, xl: 660 } }} >
      <Box sx={{ display: {xs: "flex", sm: "flex", md: "none"}, width:"90vw", margin: "auto", alignItems: "center", justifyContent: "center", borderRadius: '12px', height: 80 }}>
        {playing && <CardMedia
          component="img"
          sx={{ mr: 2, width: 60, borderRadius: "4px", objectFit: "contain" }}
          image={playing.station_image}
          alt={playing.call_sign}
          margin="auto"
          />}
        <Typography fontFamily={"Share Tech Mono"} fontSize={"1.2rem"} sx={{ ml:1, color: "black" }}>
          Playing: {playing ? <>{playing.call_sign} {playing.broadcast_frequency}</> : "None"}
        </Typography>
      </Box>
    </Box>
  )
}