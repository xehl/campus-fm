import { useState } from "react"
import { Box, Typography, Modal, Grid, TextField, AppBar } from "@mui/material";
import stations from "../stations";
import ModalCard from "./modalcard";

export default function SelectorModal({ open, handleClose, setSelectedStations }) {
  
  // need to make a variable that stores the queued stations
  // then add a button to close the modal and reload the homepage w/new selections
  // basically pass the array of stations into setSelectedStations
  const [stationQueue, setStationQueue] = useState([])

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
          maxWidth: "80vw",
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
        <Box sx={{display: "flex"}}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Select up to 10 stations:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => console.log(e.target.value)}
            sx={{
              background: "white",
            }} />
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {stationQueue.length} selected
          </Typography>
        </Box>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={{ lg: 6, md: 3 }}
          sx={{
            m: 3,
          }}
          >
        {stations.map((station) => {
          return (
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              sx={{ width: "100%" }}
              key={station.id}
            >
              <ModalCard station={station} stationQueue={stationQueue} setStationQueue={setStationQueue}/>
            </Grid>
          );
        })}
        </Grid>
        <AppBar
          position="sticky"
          sx={{
            display: "flex",
            borderTop: 2,
            bottom: 0,
            width: "100%",
            background: "#2e2e2e",
            height: "130px",
          }}
        >
          <button onClick={() => setSelectedStations(stationQueue)}>pick new stations</button>
        </AppBar>
      </Box>
    </Modal>
  )
}