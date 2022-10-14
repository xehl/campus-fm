import { Paper, CardMedia, Box, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function NowPlaying({ playing }) {
  return (
    <Box sx={{ width: '100%', mt: 2}} >
      <Paper elevation={3} sx={{ display: "flex", ml: 6, mr: 4, mb: 3, alignItems: "center", justifyContent: "flex-start", borderRadius: '12px', height: 120}}>
      <Box sx={{width:120, p:"15px", borderRadius: "10px"}}>
      {playing && <CardMedia
          component="img"
            sx={{ width: 90, borderRadius: "10px" }}
          image={playing.station_image}
          alt={playing.call_sign}
        margin="auto"
        />}
      </Box>
        <div className="playing-station">
          Now playing: {playing ? `${playing.call_sign} ${playing.broadcast_frequency}` : ""}
        </div>
        {playing ? <Link target="_blank" href={playing.station_url}><OpenInNewIcon sx={{ ml: 1, mr: 2, height: 32, width: 32, color: "black"}} /></Link> : ""}
      </Paper>
    </Box>
  )
}