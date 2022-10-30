import { CardMedia, Box, Link, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function NowPlayingLarge({ playing }) {
  return (
    <Box sx={{ width: {md: "95vw", lg: "50vw", xl:"45vw"}, margin: "auto" }}>
      <Box sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        height: { xs: 80, xl: 80 }
      }}>
        <Box sx={{ mr: 4, borderRadius: "10px" }}>
          {playing && <CardMedia
            component="img"
            sx={{ width: 60, border: 1, borderRadius: "4px", objectFit: "contain" }}
            image={playing.station_image}
            alt={playing.call_sign}
          />}
        </Box>
        <Typography noWrap variant="nowplaying" className="playing-station" sx={{ display: "flex", fontSize: "30px", color: "black", fontFamily: "Share Tech Mono" }}>
          {playing ? <>Now playing: {playing.call_sign} {playing.broadcast_frequency}</> : <>Choose a station to start listening!</>}
        </Typography>
        {playing ? <Link target="_blank" href={playing.station_url} sx={{ display: { xs: "none", md: "block" } }} ><OpenInNewIcon sx={{ ml: 2, mr: 3, height: 30, width: 30, color: "#212121" }} /></Link> : ""}
      </Box>
    </Box>
  )
}