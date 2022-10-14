import { Paper, CardMedia, Box, Link, Typography } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function NowPlaying({ playing }) {

  return (
    <Box sx={{ width: { xs: "100%", md: 580, xl: 660}, mt: 2}} >
      <Paper elevation={3} sx={{ display: {xs:"none", md: "flex"}, ml: { xs: 0, xl: 6}, mr: { xs: 0, xl:4 }, mt:{xs: -2.5, xl: 0}, alignItems: "center", justifyContent: "flex-start", borderRadius: '12px', height: {xs: 80, xl: 120}}}>
      <Box sx={{width:120, p:"15px", borderRadius: "10px"}}>
      {playing && <CardMedia
          component="img"
            sx={{ width: {xs:60, xl:90}, borderRadius: "10px" }}
          image={playing.station_image}
          alt={playing.call_sign}
        margin="auto"
        />}
      </Box>
        <Typography noWrap variant="nowplaying" className="playing-station" sx={{display:"flex", fontSize:"30px", fontFamily:"Share Tech Mono"}}>
          Now playing: {playing ? <>{playing.call_sign} {playing.broadcast_frequency}</> : "None"}
        </Typography>
        {playing ? <Link target="_blank" href={playing.station_url} sx={{ display: { xs: "none", md:"block" } }} ><OpenInNewIcon sx={{ ml: 2, mr: 3, height: 30, width: 30, color: "#212121"}} /></Link> : ""}
      </Paper>
      <Paper elevation={3} sx={{ display: { xs: "flex", md: "none" }, width:"77vw", mb: {xs: 3}, mt: -2.5, alignItems: "center", justifyContent: "flex-start", borderRadius: '12px', height: { xs: 80, xl: 120 } }}>
        <Box sx={{ height: 80, width: 80 }}>
        {playing && <CardMedia
          component="img"
          sx={{ width: 60, borderRadius: "10px", margin:"10px" }}
          image={playing.station_image}
          alt={playing.call_sign}
          margin="auto"
          />}
        </Box>
        <Typography fontFamily={"Share Tech Mono"} fontSize={"1.2rem"}sx={{ml:1}}>
          Playing: {playing ? <>{playing.call_sign} {playing.broadcast_frequency}</> : "None"}
        </Typography>
      </Paper>
    </Box>
  )
}