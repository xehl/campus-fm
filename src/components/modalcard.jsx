import { Box, Card, CardMedia, Typography } from '@mui/material/';
import ReactGA from "react-ga4"

export default function ModalCard({ station, stationQueue, setStationQueue, setAlertMessage, setAlertOpen }) {
  
  function handleQueue() {

    // if station is already selected, remove it from queue
    if (JSON.stringify(stationQueue).includes(JSON.stringify(station))) {
      setStationQueue(stationQueue.filter(queuedStation => JSON.stringify(queuedStation) !== JSON.stringify(station)))
      ReactGA.event({
        category: "Selector",
        action: "User removed " + station.call_sign + " from queue",
      });
      return
    }
    // if 10 stations are already selected, do nothing
    if (stationQueue.length === 10) {
      setAlertMessage("Can't load more than 10 stations!")
      setAlertOpen(true)
      ReactGA.event({
        category: "Selector",
        action: "User tried to add " + station.call_sign + " to queue, but already had 10 selected",
      });
      return
    }

    ReactGA.event({
      category: "Selector",
      action: "User added " + station.call_sign + " to queue",
    });
    setStationQueue([...stationQueue, station])
  }

  function highlightSelect() {
    return JSON.stringify(stationQueue).includes(JSON.stringify(station)) ? "#cefac8" : "#f0f0f0"
  }

  return (
    <Card
      onClick={handleQueue}
      sx={{
        width: "100%",
        height: {xs: "auto", sm: 258, lg: 320},
        margin: "auto",
        background: highlightSelect(),
        cursor: "pointer",
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 2
      }}>
        <CardMedia
            component="img"
            sx={{
              height: { xs: 80, sm: 110, lg: 160 },
              width: { xs: 80, sm: 110, lg: 160 },
              m: { xs: "5px", md: "5px", lg: "5px" },
              borderRadius: 2,
              border: 1,
              borderColor: "#2e2e2e",
              backgroundColor: "white",
              objectFit: "contain"
            }}
            image={station.station_image}
            alt={station.callsign}
            margin="auto"
        />
        <Typography fontFamily="Share Tech Mono" sx={{ fontSize: 24 }} color="black">
          {station.call_sign} {station.broadcast_frequency}
        </Typography>
        <Typography fontFamily="Share Tech Mono" fontSize={16} color="#575757">
          {station.college_name}
        </Typography>
        <Typography fontFamily="Share Tech Mono" fontSize={16} color="#575757">
          {station.city}, {station.state}
        </Typography>
      </Box>
    </Card >
  )
}