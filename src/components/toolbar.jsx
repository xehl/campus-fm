import { useEffect } from "react"
import { Box, Stack, Slider } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import HelpIcon from '@mui/icons-material/Help';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ReactGA from "react-ga4"

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
    fontFamily: "Share Tech Mono",
  },
}));

export default function Toolbar({ playing, setPlaying, displayedStations, volume, setVolume, userPause, setUserPause, handleSelectorModalOpen, handleFaqModalOpen, setPlayStatic, darkMode, setDarkMode }) {

  let stationElements = document.getElementsByClassName("audio-element")

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
  };

  // change volume of currently playing audio tag
  useEffect(() => {
    // select currently playing tag
    for (let station of stationElements) {
      if(!station.paused) station.volume = volume / 100
    }
  }, [stationElements, volume])

  function showPlay() {return userPause ? "block" : "none"}
  function showPause() {return userPause ? "none" : "block"}

  function playMusic() {
    for (let station of stationElements) {
      if(station.getAttribute("name") === playing?.call_sign) station.play()
    }
    setUserPause(false)
    ReactGA.event({
      category: "Toolbar",
      action: "User clicked toolbar play button",
    });
  }

  function pauseMusic() {
    for(let station of stationElements) {
      station.pause()
    }
    setUserPause(true)
    ReactGA.event({
      category: "Toolbar",
      action: "User clicked toolbar pause button",
    });
  }

  function playRandom() {

    // get an array of all loaded/playable stations, minus the one currently playing
    let readyStations = []
    for (let station of stationElements) {
      if (station.readyState >= 3) {
        if (station.getAttribute("name") !== playing?.call_sign)
          readyStations.push(station)
      }
    }

    // return if no stations are loaded
    if (readyStations.length === 0) return

    // pick a random station out of loaded array
    let randomStation = readyStations[Math.floor(Math.random() * readyStations.length)]
    let nowPlaying = displayedStations.filter(station => 
      station.call_sign === randomStation.getAttribute("name")
    )
    setPlaying(nowPlaying[0])

    // pause all stations and play the new station
    for (let station of stationElements) {
      station.pause()
    }
    randomStation.play()
    randomStation.volume = volume / 100
    setUserPause(false)
    setPlayStatic(false)

    ReactGA.event({
      category: "Toolbar",
      action: "User clicked toolbar random station button",
    });
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    ReactGA.event({
      category: "Theme",
      action: !darkMode ? "User enabled dark mode" : "User disabled dark mode",
    });
  }

// if userPause is true (user has clicked pause), display play button, otherwise display the pause button

  return (
    <Box sx={{
      width: {
        xs: "100%",
        lg: "auto"
      },
      display: "flex",
      justifyContent: "center",
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: { xs: 50, sm: 80 },
        mt: {xs: 1, sm: 0},
        ml: {xs: 0, xl: 5},
        mb: { xs: 1, sm: 1, md: 1, xl: 0 },
        width: { xs: "80%", sm: 550, md: 600, xl: 700 },
      }}>
        <LightTooltip disableTouchListener enterDelay={350} title="load new stations">
          <DashboardCustomizeIcon onClick={handleSelectorModalOpen} sx={{ width: 45, opacity: 1, fontSize: { xs: 32, sm: 42 }, color: "white", cursor: "pointer", transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }} />
        </LightTooltip>
        <LightTooltip disableTouchListener enterDelay={350} title="play random station">
          <ShuffleSharpIcon onClick={playRandom} sx={{ fontSize: { xs: 34, sm: 45 }, width: 45, color: "white", cursor: "pointer", transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }} />
        </LightTooltip>
        <LightTooltip disableTouchListener enterDelay={350} title="faq">
          <HelpIcon onClick={handleFaqModalOpen} sx={{ fontSize: { xs: 34, sm: 39 }, ml:{xs: 0, lg: 1}, width: 45, color: "white", cursor: "pointer", transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }} />
        </LightTooltip>
        <LightTooltip disableTouchListener enterDelay={350} title={darkMode ? "light mode" : "dark mode"}>
          <Box onClick={toggleDarkMode} sx={{ 
            display: { xs: "none", lg: "flex" },
            fontSize: { xs: 34, sm: 39 }, 
            width: 45, 
            color: "white", 
            cursor: "pointer", 
            transition: "0.3s", 
            "&:hover": { color: "rgb(143, 143, 143)" },
            alignItems: "center",
            justifyContent: "center"
          }}>
            {darkMode ? <LightModeIcon sx={{ fontSize: "inherit" }}/> : <DarkModeIcon sx={{ fontSize: "inherit" }}/>}
          </Box>
        </LightTooltip>
        <PlayArrowIcon onClick={playMusic} sx={{ display: showPlay(), fontSize: { xs: 48, md: 61 }, width: 45, color: "white", cursor: "pointer", transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }}/>
        <PauseIcon onClick={pauseMusic} sx={{ display: showPause(), fontSize: { xs: 41, sm: 51 }, width: 45, color: "white", cursor: "pointer", transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }}/>
        <Stack spacing={2} direction="row" alignItems="center" sx={{ ml:{xs: 0, lg: 2}, display: { xs: "none", lg: "flex" }, cursor: "pointer" }}>
          <VolumeDown onClick={() => {setVolume(0)}} sx={{ color: "white", fontSize: 50, transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }}/>
          <Slider sx={{ width: 150 }} aria-label="Volume" value={volume} onChange={handleVolumeChange} />
          <VolumeUp onClick={() => {setVolume(100)}} sx={{ color: "white", fontSize: 45, transition: "0.3s", "&:hover": { color: "rgb(143, 143, 143)" } }}/>
        </Stack>
      </Box>
    </Box>
  )
}
