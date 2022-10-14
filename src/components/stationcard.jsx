import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, handleClick, stationObject, playing}) {

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

    // if a station is already playing, pause the stream and break the buffer
    if (playing?.call_sign === callsign) {
      selectedStation.pause()
      // selectedStation.setAttribute("src", "")
      // setTimeout(function () { 
      //   selectedStation.load(); // This stops the stream from downloading
      // });
      handleClick(null);
    }
    // if a different station is selected, pause the existing stream and play the new station + change the playing state
    else {
      // console.log(stationObject, selectedStation, selectedStation.readyState)
      
      // execute if the new station is ready to play
      if (selectedStation.readyState >= 3) {
        
        // if a new station is selected
        // if (!selectedStation.getAttribute("src")) {
        //   selectedStation.setAttribute("src", audioURL)
        //   selectedStation.load()
        // }

        for (let stream of allStations) {
          stream.pause();
        }
        selectedStation.play();
        handleClick(stationObject);
      }
      else handleStall();
    }
  }

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: 200, borderRadius:2}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%"}}>
        <IconButton aria-label="play/pause" onClick={playPause}>
          {playing?.call_sign !== callsign && <PlayArrowIcon sx={{ height: 60, width: 60 }} />}
          {playing?.call_sign === callsign && <Pause sx={{ height: 60, width: 60}} />}
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
        <CardContent sx={{ width: "200px", flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" fontFamily={"Share Tech Mono"}>
            {callsign} {frequency}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" fontFamily={"Share Tech Mono"}>
            {college}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
          component="img"
          sx={{ width: 100, m:"20px"}}
          image={collegeimage}
          alt={callsign}
        margin="auto"
        />
      <audio className="audio-element" onCanPlay={streamLoaded} onStalled={handleStall} name={callsign} src={audioURL}/>
    </Card>
  );
}