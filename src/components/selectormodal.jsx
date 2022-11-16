import { useEffect, useState } from "react"
import { Box, Typography, Modal, Grid, TextField, AppBar, Button, Stack, Slide, Alert } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import stations from "../stations";
import ModalCard from "./modalcard";
import ReactGA from "react-ga4";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
    fontFamily: "Share Tech Mono",
    maxWidth: 'none',
  },
}));

export default function SelectorModal({ selectorOpen, handleSelectorClose, selectedStations, setSelectedStations, setPlaying }) {

  // on first render, pass the current array of stations into queue
  const [stationQueue, setStationQueue] = useState([])
  const [searchDisplayed, setSearchDisplayed] = useState(stations)
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    setStationQueue(selectedStations)
    // load all new stations when selected stations change (important on mobile)
    const allStations = document.getElementsByClassName("audio-element")
    for (let station of allStations) {
      station.load()
    }
  }, [selectedStations])

  // alert settings
  const [alertMessage, setAlertMessage] = useState("test");
  
  function replaceStations() {
    // don't do anything if user hasn't made changes
    if (selectedStations === stationQueue) {
      handleSelectorClose()
      return
    }

    // don't let user load if no stations selected
    if (stationQueue.length < 1) {
      setAlertMessage("Please choose at least 1 station!")
      setAlertOpen(true)
      return
    }

    // change selected stations, stop playing audio, and store user choices in localstorage
    setSelectedStations(stationQueue)
    localStorage.setItem("recentStations", JSON.stringify(stationQueue))
    setPlaying(null)

    ReactGA.event({
      category: "Selector",
      action: "User reloaded stations from selector modal",
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
      setAlertMessage("Can't load more than 10 stations!")
      setAlertOpen(true)
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
      action: "User clicked 'Surprise Me'",
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

  function handleClose() {
    setSearchDisplayed(stations)
    setStationQueue(selectedStations)
    handleSelectorClose()
  }

  return (
    <Modal
    open={selectorOpen}
    onClose={handleClose}
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
          border: "1px solid #2e2e2e",
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
            backgroundColor: "rgba(46,46,46,0.9)",
            backdropFilter: "blur(2px)",
            p: 1.5,
          }}
        >
          <Slide
            direction="right"
            in={alertOpen}
            timeout={{ enter: 300, exit: 300 }}
            addEndListener={() => {
            setTimeout(() => {
              setAlertOpen(false)
            }, 1200);
            }}
          >
            <Alert severity="error" icon={false} sx={{position: "absolute", zIndex: 1000, fontFamily: "Share Tech Mono" }}>{alertMessage}</Alert>
          </Slide>
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
            <Stack direction={{ xs: "column", md: "row" }} sx={{ ml: {md: 2, xl: 3}, m: 0.5, width: { xs: "70vw", sm: "auto" }, height: {xs: "auto", lg: 54}}} spacing={1}>
              <Stack spacing={1} direction="row" sx={{ width: { xs: "70vw", md: "auto" }, justifyContent: "center" }}>
                <LightTooltip disableTouchListener enterDelay={350} title="add ten random stations to the queue">
                  <Button variant="outlined" disableElevation onClick={pickTenRandom} sx={{ width: { xs: "50%", md: "auto" }, borderColor: "white", ':hover': { borderColor: '#909090' } }}>
                    <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="white">
                      surprise me
                    </Typography>
                  </Button>
                </LightTooltip>
                <LightTooltip disableTouchListener enterDelay={350} title="add a random station to the queue">
                    <Button variant="outlined" disableElevation onClick={addOneRandom} sx={{ height: "100%", width: { xs: "50%", md: "auto" }, borderColor: "white", ':hover': { borderColor: '#909090' } }}>
                      <Typography fontFamily="Share Tech Mono" fontSize={{ xs: 13, sm: 15 }} color="white">
                        add 1 random
                      </Typography>
                    </Button>
                  </LightTooltip>
              </Stack>
              <Stack spacing={1} direction="row" sx={{ width: {xs: "70vw", md: "auto"}, justifyContent:"center" }}>
                <LightTooltip disableTouchListener enterDelay={350} title="clear all stations from the queue">
                  <Button variant="outlined" disableElevation onClick={clearStations} sx={{ width: { xs: "50%", md: "auto" }, borderColor: "white", ':hover': { borderColor: '#909090' } }}>
                    <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="white">
                      clear all
                    </Typography>
                  </Button>
                </LightTooltip>
                <LightTooltip disableTouchListener enterDelay={350} title="save and load selected stations">
                  <Button variant="contained" disableElevation onClick={replaceStations} sx={{ width: {xs: "50%", md: "auto", xl: 200}, backgroundColor:"white", borderColor: "white", ':hover': { background: "#909090"} }}>
                    <Typography fontFamily="Share Tech Mono" fontSize={{xs: 13, sm: 15}} color="#2e2e2e">
                      save new selection
                    </Typography>
                  </Button>
                </LightTooltip>
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
              <ModalCard station={station} stationQueue={stationQueue} setStationQueue={setStationQueue} setAlertMessage={setAlertMessage} setAlertOpen={setAlertOpen}/>
            </Grid>
          );
        })}
        </Grid>
      </Box>
    </Modal>
  )
}