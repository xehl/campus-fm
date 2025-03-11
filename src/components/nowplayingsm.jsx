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
        px: 1
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          width: "100%",
          gap: 1
        }}>
        {playing &&
          <Link target="_blank" href={playing.station_url} onClick={recordEvent}>
            <CardMedia
            component="img"
            sx={{ 
              width: 40, 
              height: 40,
              borderRadius: "4px", 
              objectFit: "contain" 
            }}
            image={playing.station_image}
            alt={playing.call_sign}
            />
          </Link>}
        <Typography 
          fontFamily={"Share Tech Mono"} 
            fontSize={"1.3rem"} 
          sx={{ 
            color: "#212121",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            ml: 0.5
          }}
        >
          {playing ? <>{playing.call_sign} {playing.broadcast_frequency}</> : <>Choose a station to start listening!</>}
        </Typography>
        {playing && (
          <Link 
            href="https://buymeacoffee.com/ehlee" 
            target="_blank" 
            onClick={recordBmacEvent}
            sx={{ 
              display: "flex", 
              alignItems: "center",
              minWidth: "fit-content",
              ml: 0.5
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 25, objectFit: "contain" }}
              image="/images/bmc_logo.png"
              alt="Buy Me a Coffee"
            />
          </Link>
        )}
        </Box>
      </Box>
    </Box>
  )
}