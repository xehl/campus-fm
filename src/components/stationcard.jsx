import * as React from 'react';
import {Box, Card, CardContent, CardMedia, IconButton, Typography} from '@mui/material/';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, handleClick, stationObject, playing, setPlayStatic}) {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 800,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  theme.typography.h4 = {
    fontSize: '1.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "1.9rem",
    },
  };

  theme.typography.subtitle1 = {
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "1.4rem",
    },
  }

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
      // retry the station every second until it reloads
      let retry = setInterval(() => {
        if (thisStation.readyState >= 3) {
          thisStation.play()
          setPlayStatic(false)
          clearInterval(retry)
        }
      }, 1000);
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
    <ThemeProvider theme={theme}>
      {/* <Card onClick={playPause} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row'}, alignItems: 'center', justifyContent: "space-between", height: 200, borderRadius:2, opacity: undimIfLoaded()}}> */}
      <Card onClick={playPause} sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: { xs:150, md:200, lg:200}, borderRadius:2, opacity: undimIfLoaded()}}>
        <Box sx={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
        <CardMedia
          component="img"
            sx={{ width: { xs: 80, md: 130, lg: 150 }, m: { xs: "15px", md: "25px", lg: "25px" } }}
          image={collegeimage}
          alt={callsign}
          margin="auto"
          />
          <IconButton disableRipple="true" aria-label="play/pause" sx={{ mt: {xs: -2}, display: {xs: "block", md:"none"} }}>
            {playing?.call_sign !== callsign && <PlayArrowIcon sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
            {playing?.call_sign === callsign && <Pause sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
          </IconButton>
        </Box>
        <Box sx={{display:'flex', flexDirection: { xs: 'column', s:'row', md: 'row'}}}>
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
          <IconButton disableRipple="true" aria-label="play/pause" sx={{ display: {xs:"none", md:"block"}, mr:3 }}>
            {playing?.call_sign !== callsign && <PlayArrowIcon sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
            {playing?.call_sign === callsign && <Pause sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
          </IconButton>
        </Box>
        <audio className="audio-element" onCanPlay={streamLoaded} onStalled={handleStall} name={callsign} src={audioURL}/>
      </Card>
    </ThemeProvider>
  );
}