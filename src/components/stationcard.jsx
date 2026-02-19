import * as React from 'react';
import {Box, Card, CardContent, CardMedia, Typography, Divider, ButtonBase} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useRef, useEffect, useCallback } from 'react';
import ReactGA from "react-ga4"
import { getProxiedUrl } from '../utils/proxyHelper';

const MAX_STALL_RETRIES = 5;
const STALL_RETRY_INTERVAL_MS = 1000;
const MAX_ERROR_RETRIES = 4;
const ERROR_BASE_DELAY_MS = 2000;

function pauseAllStations() {
  const allStations = document.getElementsByClassName("audio-element");
  for (let stream of allStations) {
    stream.pause();
  }
}

export default function StationCard({callsign, frequency, college, audioURL, collegeimage, setPlaying, stationObject, playing, volume, setPlayStatic, userPause, setUserPause, darkMode}) {

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

  // Refs to avoid stale closures in intervals/timeouts
  const retryIntervalRef = useRef(null);
  const retryCountRef = useRef(0);
  const errorRetryCountRef = useRef(0);
  const errorRetryTimeoutRef = useRef(null);
  const playingRef = useRef(playing);
  const volumeRef = useRef(volume);
  const userPauseRef = useRef(userPause);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { userPauseRef.current = userPause; }, [userPause]);

  const clearRetryInterval = useCallback(() => {
    if (retryIntervalRef.current !== null) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
  }, []);

  const clearErrorRetryTimeout = useCallback(() => {
    if (errorRetryTimeoutRef.current !== null) {
      clearTimeout(errorRetryTimeoutRef.current);
      errorRetryTimeoutRef.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => { clearRetryInterval(); clearErrorRetryTimeout(); };
  }, [clearRetryInterval, clearErrorRetryTimeout]);

  // opacity is 1 if loaded, 0.15 if still buffering
  const undimIfLoaded = () => {
    return loaded? 1: 0.15;
  }
  const getStyles = () => {
    const isPlaying = playing?.call_sign === callsign;
    const playingColor = "#2e7d32";  // Material-UI's green[800]
    
    return {
      backgroundColor: isPlaying ? playingColor : (darkMode ? '#1e1e1e' : '#ffffff'),
      color: darkMode ? '#ffffff' : '#212121',
      transition: "all 0.2s ease-in-out",
      boxShadow: darkMode ? 
        '0px 2px 4px rgba(0,0,0,0.4)' : 
        '0px 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: isPlaying ? 
          playingColor : 
          (darkMode ? '#2a2a2a' : '#f5f5f5')
      },
      '& .MuiTypography-root': {
        color: isPlaying ? '#ffffff' : (darkMode ? '#ffffff' : '#212121'),
      },
      '& .MuiTypography-colorTextSecondary': {
        color: isPlaying ? '#e0e0e0' : (darkMode ? '#b3b3b3' : '#757575'),
      }
    };
  }

  const isUrlStation = () => {
    const urlStation = window.location.pathname.replace(/^\/|\/$/g, '').trim().toUpperCase();
    return urlStation === callsign;
  }

  function reloadStream() {
    const el = document.getElementsByClassName("audio-element").namedItem(callsign);
    if (!el) return;
    const src = getProxiedUrl(audioURL);
    el.setAttribute("src", "");
    el.load();
    el.setAttribute("src", src);
    el.load();
  }

  function handleStall() {
    clearRetryInterval();
    setLoaded(false);

    const thisStation = document.getElementsByClassName("audio-element").namedItem(callsign);
    if (!thisStation) return;

    console.log(callsign + " stalled, status: " + thisStation.readyState + ". retrying");
    reloadStream();

    if (playingRef.current?.call_sign !== callsign) return;

    if (userPauseRef.current) {
      setPlaying(null);
      setUserPause(false);
      return;
    }

    setPlayStatic(true);
    retryCountRef.current = 0;

    retryIntervalRef.current = setInterval(() => {
      // If user switched away from this station while we were retrying, stop.
      if (playingRef.current?.call_sign !== callsign) {
        clearRetryInterval();
        setPlayStatic(false);
        return;
      }

      retryCountRef.current++;

      if (thisStation.readyState >= 3) {
        pauseAllStations();
        thisStation.play();
        thisStation.volume = volumeRef.current / 100;
        setPlayStatic(false);
        retryCountRef.current = 0;
        clearRetryInterval();
        return;
      }

      if (retryCountRef.current >= MAX_STALL_RETRIES) {
        console.log(callsign + " giving up after " + MAX_STALL_RETRIES + " stall retries");
        clearRetryInterval();
        setPlayStatic(false);
        setPlaying(null);
        retryCountRef.current = 0;
      }
    }, STALL_RETRY_INTERVAL_MS);
  }

  function handleError() {
    const thisStation = document.getElementsByClassName("audio-element").namedItem(callsign);
    const err = thisStation?.error;

    clearRetryInterval();
    clearErrorRetryTimeout();
    setLoaded(false);

    if (playingRef.current?.call_sign === callsign) {
      setPlaying(null);
      setPlayStatic(false);
    }

    errorRetryCountRef.current++;

    if (errorRetryCountRef.current > MAX_ERROR_RETRIES) {
      console.log(callsign + " error: " + (err ? err.code + " " + err.message : "unknown") + " — gave up after " + MAX_ERROR_RETRIES + " retries");
      return;
    }

    const delay = ERROR_BASE_DELAY_MS * Math.pow(2, errorRetryCountRef.current - 1);
    console.log(callsign + " error: " + (err ? err.code + " " + err.message : "unknown") + " — retry " + errorRetryCountRef.current + "/" + MAX_ERROR_RETRIES + " in " + (delay / 1000) + "s");

    errorRetryTimeoutRef.current = setTimeout(() => {
      reloadStream();
    }, delay);
  }

  function handleEnded() {
    console.log(callsign + " stream ended, attempting reconnect");
    clearRetryInterval();
    setLoaded(false);

    reloadStream();

    if (playingRef.current?.call_sign !== callsign) return;

    setPlayStatic(true);
    retryCountRef.current = 0;

    retryIntervalRef.current = setInterval(() => {
      if (playingRef.current?.call_sign !== callsign) {
        clearRetryInterval();
        setPlayStatic(false);
        return;
      }

      retryCountRef.current++;
      const thisStation = document.getElementsByClassName("audio-element").namedItem(callsign);

      if (thisStation && thisStation.readyState >= 3) {
        pauseAllStations();
        thisStation.play();
        thisStation.volume = volumeRef.current / 100;
        setPlayStatic(false);
        retryCountRef.current = 0;
        clearRetryInterval();
        return;
      }

      if (retryCountRef.current >= MAX_STALL_RETRIES) {
        console.log(callsign + " giving up reconnect after " + MAX_STALL_RETRIES + " retries");
        clearRetryInterval();
        setPlayStatic(false);
        setPlaying(null);
        retryCountRef.current = 0;
      }
    }, STALL_RETRY_INTERVAL_MS);
  }

  const playPause = (e) => {
    const allStations = document.getElementsByClassName("audio-element")
    const selectedStation = allStations.namedItem(callsign)

    // if station isn't loaded yet, try to request it again
    if (!loaded) selectedStation.load();

    // if clicked on current station, eject the station from the player
    if (playing?.call_sign === callsign) {
      clearRetryInterval();
      selectedStation.pause()
      setPlaying(null);
      setUserPause(false);
      setPlayStatic(false);
      ReactGA.event({
        category: 'Play',
        action: 'User paused playback by unloading a station',
      });
    }

    // if a different station is selected, pause the existing stream and play the new station + change the playing state
    else {      
      // execute if the new station is ready to play
      if (selectedStation.readyState >= 3) {
        pauseAllStations();
        setPlayStatic(false)
        selectedStation.play();
        selectedStation.volume = volume / 100
        setPlaying(stationObject);
        setUserPause(false);
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
          transition: "0.2s",
          opacity: undimIfLoaded(),
          ...getStyles()
        }}>
        <ButtonBase sx={{height: "100%", width: "100%"}}>
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
            <Typography className={callsign} component="div" textAlign="right" variant="h4" fontFamily={"Share Tech Mono"} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
              {callsign} {frequency}
              {isUrlStation() && <StarIcon sx={{ color: '#FFD700', fontSize: 'inherit', stroke: 'black', strokeWidth: 1 }} />}
            </Typography>
            <Typography className={callsign} variant="subtitle1" textAlign="right" color="text.secondary" component="div" fontFamily={"Share Tech Mono"}>
              {college}
            </Typography>
          </CardContent>
        </Box>
        </ButtonBase>
        <audio
          className="audio-element"
          onLoadStart={() => setLoaded(false)}
          onCanPlay={() => { errorRetryCountRef.current = 0; setLoaded(true); }}
          onStalled={handleStall}
          onError={handleError}
          onEnded={handleEnded}
          name={callsign}
          src={getProxiedUrl(audioURL)}
          type="audio/mp3"
        />
        </Card>
    </ThemeProvider>
  );
}