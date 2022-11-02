import { CardMedia, Box, Typography, Link } from '@mui/material'
import ReactGA from "react-ga4";

export default function NowPlayingSmall({ playing }) {

  function recordEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked station link for " + playing.call_sign,
    });
  }

  return (
    <Box sx={{ width: { xs: "100%", md: 580, xl: 660 } }} >
      <Box sx={{ display: {xs: "flex", sm: "none", md: "none"}, width:"90vw", margin: "auto", alignItems: "center", justifyContent: "center", borderRadius: '12px', height: 80 }}>
        {playing &&
          <Link target="_blank" href={playing.station_url} onClick={recordEvent}>
            <CardMedia
            component="img"
            sx={{ mr: 2, width: 60, borderRadius: "4px", objectFit: "contain" }}
            image={playing.station_image}
            alt={playing.call_sign}
            margin="auto"
            />
          </Link>}
        <Typography fontFamily={"Share Tech Mono"} textAlign="center" fontSize={"1.2rem"} sx={{ ml:1, color: "#212121" }}>
          {playing ? <>Playing: {playing.call_sign} {playing.broadcast_frequency}</> : <>Choose a station to start listening!</>}
        </Typography>
      </Box>
    </Box>
  )
}