import { useEffect, useState } from "react"
import { Box, Typography, Modal, Grid, TextField, AppBar, Button, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import stations from "../stations";
import ModalCard from "./modalcard";

export default function SelectorModal({ open, handleClose, selectedStations, setSelectedStations, setPlaying }) {
  
  // on first render, pass the current array of stations into queue
  const [stationQueue, setStationQueue] = useState([])
  const [searchDisplayed, setSearchDisplayed] = useState(stations)

  useEffect(() => {
    setStationQueue(selectedStations)
    // load all new stations when selected stations change (important on mobile)
    const allStations = document.getElementsByClassName("audio-element")
    for (let station of allStations) {
      station.load();
    }
  }, [selectedStations])

  // snackbar settings
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("test");
  function openSnackBar() {
    setSnackBarOpen(true);
  };

  function replaceStations() {
    // don't do anything if user hasn't made changes
    if (selectedStations === stationQueue) handleClose()

    // don't let user load fewer than 6 stations
    if (stationQueue.length < 6) {
      setSnackBarMessage("Please choose at least 6 stations!")
      openSnackBar()
      return
    }

    // change selected stations and store user choices in localstorage
    setSelectedStations(stationQueue)
    localStorage.setItem("recentStations", JSON.stringify(stationQueue))

    setPlaying(null)
    
    // close modal
    handleClose()
  }

  function clearStations() {
    setStationQueue([])
  }

  function pickTenRandom() {
    // make array of ten unique random #s from 0 to stations.length
    // build array of ten stations at those indices    
    let randArr = []
    while (randArr.length < 10) {
      let randStation = stations[Math.floor(Math.random() * stations.length)]
      if(!randArr.includes(randStation))
        randArr.push(randStation)
    }
    setStationQueue(randArr)
  }

  function currentSelect() {
    const current = selectedStations
    setStationQueue(current)
  }

  function handleSearch(e) {
    let searchStr = e.target.value
    setSearchDisplayed(stations.filter(station => {
      return (
        station.call_sign.includes(searchStr.toUpperCase()) ||
        station.broadcast_frequency.toString().includes(searchStr)) ||
        station.city.toLowerCase().includes(searchStr.toLowerCase()) || 
        station.state.toLowerCase().includes(searchStr.toLowerCase()) ||
        station.college_name.toLowerCase().includes(searchStr.toLowerCase())
    }))
  }

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box 
        sx={{
          position: "absolute",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: "80vh",
          width: "80vw",
          bgcolor: "#2e2e2e",
          border: "2px solid #000",
          outline: 0,
          overflow: "auto",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={1200}
          onClose={() => setSnackBarOpen(false)}
          message={<Typography fontFamily="Share Tech Mono" fontSize={16} color="white">{snackBarMessage}</Typography>}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        />
        <AppBar
          position="absolute"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: 2,
            position: "sticky",
            width: "100%",
            background: "#2e2e2e",
          }}
        >
          <Box sx={{ display: "flex" }}>
          <Typography id="modal-modal-title" fontFamily="Share Tech Mono" fontSize={16} color="white">
            Select up to 10 stations: <b>{stationQueue.length} selected</b>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            autoComplete="off"
            onChange={e => handleSearch(e)}
            sx={{
              background: "white",
            }} />
        </Box>
          <Button variant="contained" disableElevation onClick={clearStations}>clear stations</Button>
          <Button variant="contained" disableElevation onClick={pickTenRandom}>choose 10 random stations</Button>
          <Button variant="contained" disableElevation onClick={replaceStations}>reload app with new stations</Button>
          {/* <Button variant="contained" disableElevation onClick={currentSelect}>current selection</Button> */}
          <CloseIcon onClick={handleClose}/>

        </AppBar>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={{ lg: 6, md: 3 }}
          sx={{
            m: 3,
          }}
          >
        {searchDisplayed.map((station) => {
          return (
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              sx={{ width: "100%" }}
              key={station.id}
            >
              <ModalCard station={station} stationQueue={stationQueue} setStationQueue={setStationQueue} setSnackBarMessage={setSnackBarMessage} openSnackBar={openSnackBar}/>
            </Grid>
          );
        })}
        </Grid>
      </Box>
    </Modal>
  )
}