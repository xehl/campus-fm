import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';

export default function StationCard({callsign, image, college, audioURL}) {

  const playAudio = () => {
    let audioEl = document.getElementsByClassName("audio-element").namedItem(callsign)
    audioEl.play();
  };

  const pauseAudio = () => {
    let audioEl = document.getElementsByClassName("audio-element").namedItem(callsign)
    audioEl.pause();
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <CardMedia
        component="img"
        sx={{ width: 150}}
        image={image}
        alt={callsign}
        margin="auto"
        justifyContent="center"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {callsign}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {college}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={playAudio}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
          </IconButton>
          <IconButton aria-label="play/pause" onClick={pauseAudio}>
            <Pause sx={{ height: 38, width: 38 }}/>
          </IconButton>
        </Box>
      </Box>
      <audio className="audio-element" name={callsign}>
        <source src={audioURL}/>
      </audio>
    </Card>
  );
}