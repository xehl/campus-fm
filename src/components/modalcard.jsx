import { Box, Card, CardMedia, Typography } from '@mui/material/';


export default function ModalCard({ station, stationQueue, setStationQueue }) {
  
  function handleQueue() {
    // if station is already selected, unselect it
    if (stationQueue.includes(station)) {
      setStationQueue(stationQueue.filter(queuedStation => queuedStation !== station))
      return
    }
    // if 10 stations are already picked, do nothing
    if (stationQueue.length === 10) {
      return
    }
    setStationQueue([...stationQueue, station])
  }

  function highlightSelected() {
    return (stationQueue.includes(station) ? "#ccecff" : "")
  }

  return (
    <Card
      onClick={handleQueue}
      sx={{
      width: { md: "100%", lg: 170 },
      mb: 1,
      background: highlightSelected()
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
              m: { xs: "5px", md: "5px", lg: "5px" }
            }}
            image={station.station_image}
            alt={station.callsign}
            margin="auto"
        />
        <Typography>
          {station.callsign} {station.college_name}
        </Typography>
        <Typography>
          {station.city} {station.state}
        </Typography>
      </Box>
    </Card >
  )
}