import { CardMedia, Box, Link, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactGA from "react-ga4";

export default function NowPlayingLarge({ playing }) {

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
    <Box sx={{ width: {md: "95vw", lg: "50vw", xl:"45vw"}, margin: "auto", position: "relative" }}>
      <Box sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        justifyContent: "center",
        height: { xs: 80, xl: 80 },
        pr: 0
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          width: "100%"
        }}>
        <Box sx={{ mr: 4, borderRadius: "10px" }}>
          {playing &&
            <CardMedia
            component="img"
            sx={{ width: 60, border: 1, borderRadius: "4px", objectFit: "contain" }}
            image={playing.station_image}
            alt={playing.call_sign}
            />
          }
        </Box>
        <Typography noWrap variant="nowplaying" className="playing-station" sx={{ display: "flex", fontSize: 30, color: "black", fontFamily: "Share Tech Mono" }}>
          {playing ? <>Now playing: {playing.call_sign} {playing.broadcast_frequency}</> : <>Choose a station to start listening!</>}
        </Typography>
        {playing ? <Link target="_blank" href={playing.station_url} sx={{ display: { xs: "none", sm: "block" } }} >
          <OpenInNewIcon onClick={recordEvent} sx={{ ml: 2, mr: 1.5, height: 30, width: 30, color: "#212121" }} />
        </Link> : ""}
        <Link 
          href="https://buymeacoffee.com/ehlee" 
          target="_blank" 
          onClick={recordBmacEvent}
          sx={{ 
            display: "flex", 
            alignItems: "center",
            ml: .8
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 32, objectFit: "contain" }}
            image="/images/bmc_logo.png"
            alt="Buy Me a Coffee"
          />
        </Link>
        </Box>
      </Box>
    </Box>
  )
}