import { Box } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';

export default function Toolbar({ playing, setPlaying, openModal, displayedStations }) {

  let stationElements = document.getElementsByClassName("audio-element")

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
      <DashboardCustomizeIcon onClick={openModal}sx={{ fontSize: 47, color: "white"}}/>
      <PlayArrowIcon onClick={playMusic} sx={{ fontSize: 65, color: "white" }}/>
      <PauseIcon onClick={pauseMusic} sx={{ fontSize: 65, color: "white" }}/>
      <ShuffleSharpIcon onClick={playRandom} sx={{ fontSize: 50, color: "white" }}/>
    </Box>
  )
}