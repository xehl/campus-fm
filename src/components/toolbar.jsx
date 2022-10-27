import { useState, useEffect } from "react"
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function Toolbar({ playing, setPlaying, openModal, displayedStations, volume, setVolume }) {

  let stationElements = document.getElementsByClassName("audio-element")

  const handleVolumeChange = (e, newValue) => {
    console.log(newValue)
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
  }

  function pauseMusic() {
    for(let station of stationElements) {
      station.pause()
    }
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
    console.log(randomStation.volume)
  }

  return (
    <Box elevation={3} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: '12px',
      height: { xs: 80, xl: 80 },
      width: "30vw",
      backgroundColor: "#2e2e2e"
    }}>
      <DashboardCustomizeIcon onClick={openModal} sx={{ fontSize: 47, color: "white" }} />
      <ShuffleSharpIcon onClick={playRandom} sx={{ fontSize: 50, color: "white" }} />
      <PlayArrowIcon onClick={playMusic} sx={{ fontSize: 65, color: "white" }}/>
      <PauseIcon onClick={pauseMusic} sx={{ fontSize: 65, color: "white" }}/>
      <Stack spacing={2} direction="row" sx={{ ml: 9, width: 300 }} alignItems="center">
        <VolumeDown sx={{ fontSize: 55 }}/>
        <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} />
        <VolumeUp sx={{ fontSize: 50 }}/>
      </Stack>
    </Box>
  )
}