import { useEffect } from "react"
import { Box, Stack, Slider } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import HelpIcon from '@mui/icons-material/Help';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
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

export default function Toolbar({ playing, setPlaying, displayedStations, volume, setVolume, userPause, setUserPause, handleSelectorModalOpen, handleFaqModalOpen, setPlayStatic }) {

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

// if userPause is true (user has clicked pause), display play button, otherwise display the pause button

  return (
    <Box sx={{
      width: {
        xs: "100vw",
        lg: "auto"
      },
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#2e2e2e",
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: { xs: 50, sm: 80 },
        mt: {xs: 1, sm: 0},
        ml: {xs: 0, xl: 5},
        mb: { xs: 1, sm: 1, md: 1, xl: 0 },
        width: { xs: "70%", sm: 550, md: 600, xl: 700 },
      }}>
        <LightTooltip disableTouchListener enterDelay={350} title="load new stations" sx={{fontFamily: "Share Tech Mono"}}>
          <DashboardCustomizeIcon onClick={handleSelectorModalOpen} sx={{ width: 50, fontSize: { xs: 36, sm: 47 }, color: "white", cursor: "pointer" }} />
        </LightTooltip>
        <LightTooltip disableTouchListener enterDelay={350} title="play random station">
          <ShuffleSharpIcon onClick={playRandom} sx={{ fontSize: { xs: 38, sm: 50 }, width: 50, color: "white", cursor: "pointer" }} />
      </LightTooltip>
        <LightTooltip disableTouchListener enterDelay={350} title="faq">
          <HelpIcon onClick={handleFaqModalOpen} sx={{ fontSize: { xs: 38, sm: 43 }, ml:{xs: 0, lg: 1}, width: 50, color: "white", cursor: "pointer" }} />
        </LightTooltip>
        <PlayArrowIcon onClick={playMusic} sx={{ display: showPlay(), fontSize: { xs: 53, md: 68 }, width: 50, color: "white", cursor: "pointer" }}/>
        <PauseIcon onClick={pauseMusic} sx={{ display: showPause(), fontSize: { xs: 46, sm: 57 }, width: 50, color: "white", cursor: "pointer" }}/>
        <Stack spacing={2} direction="row" alignItems="center" sx={{ ml:{xs: 0, lg: 2}, display: { xs: "none", lg: "flex" }, cursor: "pointer" }}>
          <VolumeDown onClick={() => {setVolume(0)}} sx={{ color: "white", fontSize: 55 }}/>
          <Slider sx={{ width: 150 }} aria-label="Volume" value={volume} onChange={handleVolumeChange} />
          <VolumeUp onClick={() => {setVolume(100)}} sx={{ color: "white", fontSize: 50 }}/>
        </Stack>
      </Box>
    </Box>
  )
}