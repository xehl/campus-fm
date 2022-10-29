import { useEffect, useState } from "react"
import { Box, Typography, Modal, Grid, TextField, AppBar, Button, Snackbar, Stack } from "@mui/material";
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
    if (selectedStations === stationQueue) {
      handleClose()
      return
    }

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
          border: "5px solid #b0b0b0",
          outline: 0,
          overflowX: 'hidden',
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar
          position="absolute"
          sx={{
            display: "flex",
            flexDirection: {xs: "column",sm: "row"},
            alignItems: "center",
            textAlign: "center",
            position: "sticky",
            width: "100%",
            height: "auto",
            justifyContent: "space-between",
            backgroundColor: "black",
            p: 1.5,
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
          <Stack direction="row" spacing={1} alignItems="center" sx={{mr: 2}}>
            <Typography fontFamily="Share Tech Mono" fontSize={{ xs: 14, sm: 16 }} sx={{width: 130}} color="white">
              Select up to 10 stations:
            </Typography>
            <Typography fontFamily="Share Tech Mono" fontSize={{ xs: 20, sm: 30 }} sx={{ m: 2, width: 36, p: .7, borderRadius: 1, background: "white" }} color="black">
              <b>{stationQueue.length}</b>
            </Typography>
          </Stack>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="search"
            autoComplete="off"
            onChange={e => handleSearch(e)}
            InputProps={{ style: { fontSize: 15, fontFamily:"Share Tech Mono", background: "white", } }}
            sx={{
              width: {xs: "70vw", sm: 350, md: 350, lg: 350},
              borderRadius: 1,
              mb: 1,
              mt: 1,
            }} />
          <Stack direction={{ xs: "column", sm: "row" }} sx={{ m: 0.5, width: { xs: "70vw", sm: "auto" }, height: {xs: "auto", sm: 55}}} spacing={1}>
              <Button variant="outlined" disableElevation onClick={clearStations} sx={{ borderColor:"white"}}>
                <Typography fontFamily="Share Tech Mono" fontSize={{xs: 12, sm: 15}} color="white">
                  clear stations
                </Typography>
              </Button>
              <Button variant="outlined" disableElevation onClick={pickTenRandom} sx={{ borderColor: "white" }}>
                <Typography fontFamily="Share Tech Mono" fontSize={{xs: 12, sm: 15}} color="white">
                  choose 10 random
                </Typography>
              </Button>
              <Button variant="contained" disableElevation onClick={replaceStations} sx={{ backgroundColor:"white", borderColor: "white" }}>
                <Typography fontFamily="Share Tech Mono" fontSize={{xs: 12, sm: 15}} color="#2e2e2e">
                  load new stations
                </Typography>
              </Button>
            </Stack>
          </AppBar>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#2e2e2e",
          }}
          >
        {searchDisplayed.map((station) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
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