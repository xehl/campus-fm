import { Box, Card, CardMedia, Typography } from '@mui/material/';

export default function ModalCard({ station, stationQueue, setStationQueue, setSnackBarMessage, openSnackBar }) {
  
  function handleQueue() {

    // if station is already selected, remove it from queue
    if (JSON.stringify(stationQueue).includes(JSON.stringify(station))) {
      setStationQueue(stationQueue.filter(queuedStation => JSON.stringify(queuedStation) !== JSON.stringify(station)))
      return
    }
    // if 10 stations are already selected, do nothing
    if (stationQueue.length === 10) {
      setSnackBarMessage("Can't load more than 10 stations simultaneously!")
      openSnackBar()
      return
    }
    setStationQueue([...stationQueue, station])
  }

  function highlightSelect() {
    return JSON.stringify(stationQueue).includes(JSON.stringify(station)) ? "#ccecff" : "#e3e3e3"
  }

  return (
    <Card
      onClick={handleQueue}
      sx={{
      width: { md: "100%", lg: 170 },
      mb: 1,
      background: highlightSelect(),
      cursor: "pointer",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}>
        <CardMedia
            component="img"
            sx={{
              height: { xs: 80, md: 80, lg: 80 },
              width: { xs: 80, md: 80, lg: 80 },
              m: { xs: "5px", md: "5px", lg: "5px" },
              borderRadius: 2,
              border: 1,
            }}
            image={station.station_image}
            alt={station.callsign}
            margin="auto"
        />
        <Typography fontFamily="Share Tech Mono" fontSize={16} color="black">
          {station.callsign} {station.college_name}
        </Typography>
        <Typography fontFamily="Share Tech Mono" fontSize={16} color="black">
          {station.city} {station.state}
        </Typography>
      </Box>
    </Card >
  )
}