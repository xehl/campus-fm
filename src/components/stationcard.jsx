import * as React from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import ReactGA from "react-ga4"

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, setPlaying, stationObject, playing, volume, setPlayStatic, userPause, setUserPause}) {

  const sendOutbound = (e) => {    
    e.preventDefault();
    // get callsign off class list
    let sign = null
    e.target.classList.forEach(cla => {
      if (cla.length === 4) sign = cla 
    })
    ReactGA.event({
      category: 'Play',
      action: 'User played ' + sign,
    });
  }

  const cardtheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 821,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  cardtheme.typography.h4 = {
    fontSize: '1.5rem',
    [cardtheme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
    [cardtheme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
    [cardtheme.breakpoints.up('lg')]: {
      fontSize: "1.9rem",
    },
  };

  cardtheme.typography.subtitle1 = {
    fontSize: '1rem',
    [cardtheme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
    [cardtheme.breakpoints.up('lg')]: {
      fontSize: "1.4rem",
    },
  }
  const [loaded, setLoaded] = useState(false)

  // opacity is 1 if loaded, 0.15 if still buffering
  const undimIfLoaded = () => {
    return loaded? 1: 0.15;
  }
  const greenIfPlaying = () => {
    return (playing?.call_sign === callsign) ? "#cefac8" : "";
  }

  function handleStall() {
    // remove and reload stalled station audio stream
    setLoaded(false)
    const thisStation = document.getElementsByClassName("audio-element").namedItem(callsign)
    thisStation.setAttribute("src", "")
    setTimeout(function () { 
        thisStation.load() // This stops the stream from downloading; basically forces it to load an empty file
    }, 100)
    thisStation.setAttribute("src", audioURL)
    thisStation.load()
    // if the currently playing station is stalled
    if (playing?.call_sign === callsign) {
      // unload the station if user has paused manually
      if (userPause) {
        setPlaying(null)
        setUserPause(false)
        return
      }
      // play static and retry the station every second until it reloads
      setPlayStatic(true)
      let retry = setInterval(() => {
        if (thisStation.readyState >= 3) {
          thisStation.play()
          thisStation.volume = volume / 100
          setPlayStatic(false)
          clearInterval(retry)
        }
      }, 1000);
    }
  }
  const playPause = (e) => {
    // select all audio stream elements + selected stream
    const allStations = document.getElementsByClassName("audio-element")
    const selectedStation = allStations.namedItem(callsign)
    if (!loaded) selectedStation.load();

    // if clicked on current station, eject the station from the player
    if (playing?.call_sign === callsign) {
      selectedStation.pause()
      setPlaying(null);
      setUserPause(false);
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
        selectedStation.volume = volume / 100
        setPlaying(stationObject);
        setUserPause(false)
        sendOutbound(e);
      }
      else handleStall();
    }
  }

  return (
    <ThemeProvider theme={cardtheme}>
      <Card
        className={callsign}
        onClick={(e) => playPause(e)}
        sx={{
          cursor: "pointer",
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-between",
          height: { xs: 150, md: 200, lg: 200 },
          borderRadius: 2,
          opacity: undimIfLoaded(),
          background: greenIfPlaying()
        }}>
        <CardMedia
          className={callsign}
          component="img"
          sx={{
            height: { xs: 90, md: 130, lg: 150 },
            width: { xs: 90, md: 130, lg: 150 },
            m: { xs: "15px", md: "25px", lg: "25px" }
          }}
          image={collegeimage}
          alt={callsign}
          margin="auto"
          />
        <Box className={callsign} sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
          <CardContent className={callsign} sx={{ display: 'flex', flexDirection: 'column', alignItems: "flex-end", mr:1.5}}>
            <Typography className={callsign} component="div" textAlign="right" variant="h4" fontFamily={"Share Tech Mono"}>
              {callsign} {frequency}
            </Typography>
            <Typography className={callsign} variant="subtitle1" textAlign="right" color="text.secondary" component="div" fontFamily={"Share Tech Mono"}>
              {college}
            </Typography>
          </CardContent>
        </Box>
          {/* <IconButton disableRipple="true" aria-label="play/pause" sx={{ display: {xs:"none", md:"block"}, mr:3 }}>
            {playing?.call_sign !== callsign && <PlayArrowIcon sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
            {playing?.call_sign === callsign && <Pause sx={{ height: { xs: 30, md: 50, lg: 70 }, width: { xs: 30, md: 50, lg: 70 }}} />}
          </IconButton> */}
        <audio className="audio-element" onLoadStart={() => setLoaded(false)} onCanPlay={() => setLoaded(true)} onStalled={handleStall} name={callsign} src={audioURL} type="audio/mp3"/>
      </Card>
    </ThemeProvider>
  );
}