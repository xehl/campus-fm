import {Paper, CardMedia} from '@mui/material'

export default function NowPlaying({ playing }) {
  return (
    <Paper elevation={3} sx={{ display: "flex", alignItems: "center", mb: "20px", borderRadius: '15px', height: 140}}>
      <div className="play-img-container">
      {playing && <CardMedia
          component="img"
          sx={{ width: 100, m:"20px", borderRadius: "10px"}}
          image={playing.station_image}
          alt={playing.call_sign}
        margin="auto"
        />}
      </div>
      <div className="playing-station">
        Now playing: {playing?.call_sign ? `${playing.call_sign} ${playing.broadcast_frequency}` : ""}
      </div>
    </Paper>
  )
}