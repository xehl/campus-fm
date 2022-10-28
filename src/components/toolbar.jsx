import { useEffect } from "react"
import { Box, Stack, Slider, Typography } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontFamily: "Helvetica",
  },
}));

export default function Toolbar({ playing, setPlaying, displayedStations, volume, setVolume, userPause, setUserPause, handleModalOpen }) {

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

  function playMusic() {
    for (let station of stationElements) {
      if(station.getAttribute("name") === playing?.call_sign) station.play()
    }
    setUserPause(false)
  }

  function showPlay() {return userPause ? "block" : "none"}
  function showPause() {return userPause ? "none" : "block"}

  function pauseMusic() {
    for(let station of stationElements) {
      station.pause()
    }
    setUserPause(true)
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
  }

// if userPause is true (user has clicked pause), display play button, otherwise display the pause button

  return (
    <Box elevation={-4} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      height: { xs: 40, sm: 80 },
      mt: { xs: -2, sm: -2, lg: -2, xl: 0},
      mb: { xs: 1, sm: 1, md: 1, xl: 0},
      width: { xs: 330, sm: 550, md: 600, xl: 700 },
      backgroundColor: "#2e2e2e"
    }}>
      <LightTooltip enterDelay={350} title={<Typography fontFamily="Share Tech Mono" fontSize={16}>load new stations</Typography>} sx={{fontFamily: "Share Tech Mono"}}>
        <DashboardCustomizeIcon onClick={handleModalOpen} sx={{ fontSize: { xs: 36, sm: 47 }, color: "white", cursor: "pointer" }} />
      </LightTooltip>
      <LightTooltip enterDelay={350} title={<Typography fontFamily="Share Tech Mono" fontSize={16}>play random station</Typography>}>
        <ShuffleSharpIcon onClick={playRandom} sx={{ fontSize: { xs: 38, sm: 50 }, color: "white", cursor: "pointer" }} />
      </LightTooltip>
      <PlayArrowIcon onClick={playMusic} sx={{ display: showPlay(), fontSize: { xs: 50, m: 65 }, color: "white", cursor: "pointer" }}/>
      <PauseIcon onClick={pauseMusic} sx={{ display: showPause(), fontSize: { xs: 50, sm: 65 }, color: "white", cursor: "pointer" }}/>
      <Stack spacing={2} direction="row" alignItems="center" sx={{ display: { xs: "none", sm: "flex"}, cursor: "pointer" }}>
        <VolumeDown sx={{ fontSize: { sm: 55 } }}/>
        <Slider sx={{ width: { xs: 80, sm: 100, md: 120, xl: 200 } }} aria-label="Volume" value={volume} onChange={handleVolumeChange} />
        <VolumeUp sx={{ fontSize: { sm: 50 } }}/>
      </Stack>
    </Box>
  )
}