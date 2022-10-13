import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';

export default function StationCard({callsign, image, college, audioURL, handleClick, stationObject, playing}) {

  function streamLoaded() {
    console.log("loaded " + callsign)
  }

  function handleStall() {
    console.log(callsign + " stalled")
  }

  const playPause = () => {

    // select all audio stream elements + selected stream
    const allStations = document.getElementsByClassName("audio-element")
    const selectedStation = allStations.namedItem(callsign)

    selectedStation.addEventListener('readystatechange', (e) => { console.log(selectedStation.readyState) })

    // if a station is already playing, pause the stream
    if (playing === callsign) {
      selectedStation.pause()
      handleClick(null);
    }
    // if a different station is selected, pause the existing stream and play the new station + change the playing state
    else {
      console.log(selectedStation, selectedStation.readyState)
      for (let stream of allStations) {
        stream.pause();
      }
      selectedStation.play();
      handleClick(stationObject);
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%"}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {callsign}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {college}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%"}}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={image}
          alt={callsign}
          margin="auto"
        />
        <IconButton aria-label="play/pause" onClick={playPause}>
          {playing !== callsign && <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
          {playing === callsign && <Pause sx={{ height: 38, width: 38 }} />}
        </IconButton>
      </Box>
      <audio className="audio-element" onCanPlay={streamLoaded} onStalled={handleStall} name={callsign} src={audioURL}/>
    </Card>
  );
}