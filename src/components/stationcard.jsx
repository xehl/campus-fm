import * as React from 'react';
import {Box, Card, CardContent, CardMedia, Typography, Divider} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import ReactGA from "react-ga4"

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, setPlaying, stationObject, playing, volume, setPlayStatic, userPause, setUserPause}) {

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
      fontSize: '1.4rem',
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
    console.log(callsign + " stalled, retrying. status: " + thisStation.readyState)
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
      ReactGA.event({
        category: 'Play',
        action: 'User paused playback by unloading a station',
      });
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
        ReactGA.event({
          category: 'Play',
          action: 'User played ' + selectedStation.getAttribute("name"),
        });
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
          justifyContent: "flex-start",
          height: { xs: 150, md: 200, lg: 200 },
          borderRadius: 2,
          opacity: undimIfLoaded(),
          background: greenIfPlaying()
        }}>
        <Box sx={{
          height: { xs: 100, md: 155, lg: 175 },
          width: { xs: 100, md: 155, lg: 175 },
          minWidth: { xs: 100, md: 155, lg: 175 },
          p: {xs: "20px", md: "25px"},
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <CardMedia
          className={callsign}
          component="img"
          sx={{
            objectFit: "contain",
            height: "85%"
          }}
          image={collegeimage}
          alt={callsign}
          margin="auto"
          />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box className={callsign} sx={{
          display: 'flex',
          flexDirection: 'column',
          width: "100%",
          mr: 1.5 
        }}> 
          <CardContent className={callsign} sx={{ display: 'flex', flexDirection: 'column', alignItems: "flex-end"}}>
            <Typography className={callsign} component="div" textAlign="right" variant="h4" fontFamily={"Share Tech Mono"}>
              {callsign} {frequency}
            </Typography>
            <Typography className={callsign} variant="subtitle1" textAlign="right" color="text.secondary" component="div" fontFamily={"Share Tech Mono"}>
              {college}
            </Typography>
          </CardContent>
        </Box>
        <audio className="audio-element" onLoadStart={() => setLoaded(false)} onCanPlay={() => setLoaded(true)} onStalled={handleStall} name={callsign} src={audioURL} type="audio/mp3"/>
      </Card>
    </ThemeProvider>
  );
}