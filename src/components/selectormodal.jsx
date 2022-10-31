import { useEffect, useState } from "react"
import { Box, Typography, Modal, Grid, TextField, AppBar, Button, Snackbar, Stack } from "@mui/material";
import stations from "../stations";
import ModalCard from "./modalcard";
import ReactGA from "react-ga4";

export default function SelectorModal({ selectorOpen, handleSelectorClose, selectedStations, setSelectedStations, setPlaying }) {
  
  // on first render, pass the current array of stations into queue
  const [stationQueue, setStationQueue] = useState([])
  const [searchDisplayed, setSearchDisplayed] = useState(stations)

  useEffect(() => {
    setStationQueue(selectedStations)
    // load all new stations when selected stations change (important on mobile)
    const allStations = document.getElementsByClassName("audio-element")
    for (let station of allStations) {
      station.load()
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
      handleSelectorClose()
      return
    }

    // don't let user load if no stations selected
    if (stationQueue.length < 1) {
      setSnackBarMessage("Please choose at least 1 station!")
      openSnackBar()
      return
    }

    // change selected stations, stop playing audio, and store user choices in localstorage
    setSelectedStations(stationQueue)
    localStorage.setItem("recentStations", JSON.stringify(stationQueue))
    setPlaying(null)

    let stationStr = ""
    stationQueue.forEach(station => stationStr += (station.call_sign + " "))

    ReactGA.event({
      category: "Selector",
      action: "User reloaded stations: " + stationStr,
      value: stationQueue.length
    });

    // close modal
    handleSelectorClose()
  }

  function clearStations() {
    setStationQueue([])
    ReactGA.event({
      category: "Selector",
      action: "User cleared stations from the queue"
    });
  }

  function pickRandomStation() {
    return stations[Math.floor(Math.random() * stations.length)]
  }

  function addOneRandom() {

    // throw error if already 10 selected
    if (stationQueue.length === 10) {
      setSnackBarMessage("Can't load more than 10 stations simultaneously!")
      openSnackBar()
      return
    }

    // choose random station
    let randStation = pickRandomStation()

    // retry if random station is already selected
    if(stationQueue.includes(randStation)) {
      while (stationQueue.includes(randStation)) {
        randStation = pickRandomStation()
        // console.log("already selected, now picking")
        // console.log(randStation)
      }
    }

    ReactGA.event({
      category: "Selector",
      action: "User added random station to queue: " + randStation.call_sign,
    });

    setStationQueue([...stationQueue, randStation])
  }

  function pickTenRandom() {
    // make array of ten unique random #s from 0 to stations.length
    // build array of ten stations at those indices    
    let randArr = [], stationString = ""
    while (randArr.length < 10) {
      let randStation = pickRandomStation()
      if(!randArr.includes(randStation))
        randArr.push(randStation)
    }
    setStationQueue(randArr)

    randArr.forEach(station => stationString += (station.call_sign + " "))

    ReactGA.event({
      category: "Selector",
      action: "User clicked 'Surprise Me', algorithm loaded: " + stationString,
    });
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
    open={selectorOpen}
    onClose={handleSelectorClose}
    >
      <Box 
        sx={{
          position: "absolute",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: "80vh",
          width: "85vw",
          bgcolor: "#2e2e2e",
          border: "5px solid #b0b0b0",
          boxShadow: 2,
          outline: 0,
          overflowX: 'hidden',
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5001
        }}
      >
        <AppBar
          position="absolute"
          sx={{
            display: "flex",
            flexDirection: {xs: "column", md: "row"},
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
          <Stack direction="row" spacing={1} sx={{mr: {xs: 0, sm: 2}, width: { xs: "70vw", sm: 180}, alignItems: "center", justifyContent:"center" }}>
            <Typography fontFamily="Share Tech Mono" fontSize={{ xs: 14, sm: 16 }} sx={{ width: { xs: "auto", md: 130}}} color="white">
              Select up to 10 stations:
            </Typography>
            <Typography fontFamily="Share Tech Mono" fontSize={{ xs: 20, sm: 30 }} sx={{ m: 2, width: 36, p: {xs: .4, sm: .7}, borderRadius: 1, background: "white" }} color="black">
              <b>{stationQueue.length}</b>
            </Typography>
          </Stack>
          {/* can't figure out how to make size prop conditional; just gonna display/hide two textfields */}
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="search"
            autoComplete="off"
            onChange={e => handleSearch(e)}
            InputProps={{ style: { fontSize: 15, fontFamily: "Share Tech Mono", background: "white", } }}
            fullWidth
            sx={{
              display: {xs: "none", sm: "block"}, 
              width: {xs: "70vw", sm:"70vw", md: 350},
              borderRadius: 1,
              mb: 1,
              mt: 1,
            }} />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="search"
            autoComplete="off"
            size= "small"
            onChange={e => handleSearch(e)}
            fullWidth
            InputProps={{ style: { fontSize: 15, fontFamily:"Share Tech Mono", background: "white"} }}
            sx={{
              display: {xs: "block", sm: "none"}, 
              width: {xs: "70vw", md: 350},
              mb: .5,
              mt: 1,
            }} />
            <Stack direction={{ xs: "column", md: "row" }} sx={{ ml: {md: 2, xl: 3}, m: 0.5, width: { xs: "70vw", sm: "auto" }, height: {xs: "auto", xl: 54}}} spacing={1}>
              <Stack spacing={1} direction="row" sx={{ width: {xs: "70vw", md: "auto"}, justifyContent:"center" }}>
              <Button variant="outlined" disableElevation onClick={addOneRandom} sx={{ width: {xs: "50%", md: "auto"}, borderColor: "white" }}>
                  <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="white">
                    add 1 random
                  </Typography>
                </Button>
                <Button variant="outlined" disableElevation onClick={pickTenRandom} sx={{ width: {xs: "50%", md: "auto"}, borderColor: "white" }}>
                  <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="white">
                    surprise me
                  </Typography>
                </Button>
              </Stack>
              <Stack spacing={1} direction="row" sx={{ width: {xs: "70vw", md: "auto"}, justifyContent:"center" }}>
                <Button variant="outlined" disableElevation onClick={clearStations} sx={{ width: {xs: "50%", md: "auto"}, borderColor:"white"}}>
                  <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="white">
                    clear all
                  </Typography>
                </Button>
                <Button variant="contained" disableElevation onClick={replaceStations} sx={{ width: {xs: "50%", md: "auto"}, backgroundColor:"white", borderColor: "white" }}>
                  <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="#2e2e2e">
                    reload stations
                  </Typography>
                </Button>
              </Stack>
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