import "./App.css";
import { AppBar, Box, Grid, Container } from "@mui/material";
import StationCard from "./components/stationcard";
import stations from "./stations";
import Bulb from "react-bulb";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import NowPlaying from "./components/nowplaying";

function App() {
  // load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road", "Share Tech Mono"],
      },
    });
  }, []);

  // stores which station is currently playing
  const [playing, setPlaying] = useState(null);
  const [playStatic, setPlayStatic] = useState(false);

  // plays static when playStatic state changes
  useEffect(() => {
    console.log("playstatic changed");
    const staticSound = document.getElementsByClassName("staticAudio")[0];
    if (playStatic === true) staticSound.play();
    if (playStatic === false) staticSound.pause();
  }, [playStatic]);

  // basically just sets the playing state, passed into card (maybe not optimal)
  function handleClick(station) {
    // console.log("setting playing to ", station);
    setPlaying(station);
  }

  return (
    <div className="App">
      <AppBar
        position="absolute"
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 2,
          position: "fixed",
          width: "100%",
          background: "#2e2e2e",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
            width: "80%",
          }}
        >
          <Box>
            <div
              className="title"
              onClick={() => {
                playStatic ? setPlayStatic(false) : setPlayStatic(true);
              }}
            >
              campus.fm
            </div>
            <div className="detail">listen to campus radio stations</div>
          </Box>
          <NowPlaying playing={playing} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: "10px" }}>ON/OFF</Box>
            <Box>
              {playing && <Bulb size={20} color="green" />}
              {!playing && <Bulb size={20} color="black" />}
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box sx={{ height: "180px" }} />
      <Container sx={{ width: "85%" }}>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={{ lg: 4, md: 3 }}
        >
          {stations.map((station) => {
            return (
              <Grid item xs={12} md={6} key={station.id}>
                <StationCard
                  callsign={station.call_sign}
                  frequency={station.broadcast_frequency}
                  college={station.college_name}
                  audioURL={station.audio_url}
                  collegeimage={station.college_image}
                  handleClick={handleClick}
                  stationObject={station}
                  playing={playing}
                  // setPlayStatic={setPlayStatic}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <audio
        className="staticAudio"
        preload="auto"
        loop
        src="https://www.soundjay.com/mechanical/sounds/tv-static-05.mp3"
      />
    </div>
  );
}

export default App;
