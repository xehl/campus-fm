import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import { useState } from 'react';

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, handleClick, stationObject, playing, setPlayStatic}) {

  const [loaded, setLoaded] = useState(false)

  const undimIfLoaded = () => {
    return loaded? 1: 0.15;
  }

  function streamLoaded() {
    setLoaded(true)
  }

  function handleStall() {
    // remove and reload stalled station audio stream
    console.log(callsign + " stalled, reloading now")
    setLoaded(false)
    const thisStation = document.getElementsByClassName("audio-element").namedItem(callsign)
    thisStation.setAttribute("src", "")
    setTimeout(function () { 
        thisStation.load(); // This stops the stream from downloading
    }, 100);
    thisStation.setAttribute("src", audioURL)
    thisStation.load()

    // if the currently playing station is stalled, change the playing state to null + play static
    if (playing?.call_sign === callsign) {
      setPlayStatic(true)
      let retry = setInterval(() => {
        if (thisStation.readyState >= 3) {
          thisStation.play()
          setPlayStatic(false)
          clearInterval(retry)
        }
      }, 2000);
    }
  }

  const playPause = () => {
    // select all audio stream elements + selected stream
    const allStations = document.getElementsByClassName("audio-element")
    const selectedStation = allStations.namedItem(callsign)

    if (playing?.call_sign === callsign) {
      selectedStation.pause()
      handleClick(null);
    }
    // if a different station is selected, pause the existing stream and play the new station + change the playing state
    else {      
      // execute if the new station is ready to play
      if (selectedStation.readyState >= 3) {
        for (let stream of allStations) {
          stream.pause();
        }
        setPlayStatic(false)
        selectedStation.play();
        handleClick(stationObject);
      }
      else handleStall();
    }
  }

  return (
    <Card onClick={playPause} sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: 200, borderRadius:2, opacity: undimIfLoaded()}}>
      <CardMedia
        component="img"
        sx={{ width: 130, m:"25px"}}
        image={collegeimage}
        alt={callsign}
        margin="auto"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4" fontFamily={"Share Tech Mono"}>
            {callsign} {frequency}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" fontFamily={"Share Tech Mono"}>
            {college}
          </Typography>
        </CardContent>
      </Box>
      <IconButton aria-label="play/pause" sx={{ mr:3 }}>
        {playing?.call_sign !== callsign && <PlayArrowIcon sx={{ height: 70, width: 70}} />}
        {playing?.call_sign === callsign && <Pause sx={{ height: 70, width: 70}} />}
      </IconButton>
      <audio className="audio-element" onCanPlay={streamLoaded} onStalled={handleStall} name={callsign} src={audioURL}/>
    </Card>
  );
}