import { CardMedia, Box, Typography, Link } from '@mui/material'
import ReactGA from "react-ga4";

export default function NowPlayingSmall({ playing }) {

  function recordEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked station link for " + playing.call_sign,
    });
  }

  function recordBmacEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked BMAC link in footer",
    });
  }

  return (
    <Box sx={{ width: { xs: "100%", md: 580, xl: 660 } }} >
      <Box sx={{ 
        display: {xs: "flex", sm: "none", md: "none"}, 
        width: "85vw", 
        margin: "auto", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: '12px', 
        height: 80, 
        position: "relative",
        px: 2
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          width: "100%"
        }}>
        {playing &&
          <Link target="_blank" href={playing.station_url} onClick={recordEvent}>
            <CardMedia
            component="img"
            sx={{ width: 50, borderRadius: "4px", objectFit: "contain" }}
            image={playing.station_image}
            alt={playing.call_sign}
            margin="auto"
            />
          </Link>}
        <Typography fontFamily={"Share Tech Mono"} textAlign="center" fontSize={"1.2rem"} sx={{ color: "#212121", ml: 2 }}>
          {playing ? <>Playing: {playing.call_sign} {playing.broadcast_frequency}</> : <>Choose a station to start listening!</>}
        </Typography>
        <Link 
          href="https://buymeacoffee.com/ehlee" 
          target="_blank" 
          onClick={recordBmacEvent}
          sx={{ 
            display: "flex", 
            alignItems: "center",
            ml: 1.5
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 25, objectFit: "contain" }}
            image="/images/bmc_logo.png"
            alt="Buy Me a Coffee"
          />
        </Link>
        </Box>
      </Box>
    </Box>
  )
}