import "./App.css";
import { Box, Grid, Container } from "@mui/material";
import StationCard from "./components/stationcard";
import stations from "./mockStations";
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
    const staticSound = document.getElementsByClassName("staticAudio")[0];
    if (playStatic === true) staticSound.play();
    if (playStatic === false) staticSound.pause();
  }, [playStatic]);

  // basically just sets the playing state, passed into card (maybe not optimal)
  function handleClick(station) {
    setPlaying(station?.call_sign);
  }

  return (
    <div className="App">
      <Box
        sx={{
          width: "85%",
          margin: "auto",
        }}
      >
        <div
          className="title"
          onClick={() => {
            playStatic ? setPlayStatic(false) : setPlayStatic(true);
          }}
        >
          campus.fm
        </div>
        <div className="detail">listen to campus radio stations</div>
        <NowPlaying playing={playing} />
        {playStatic && <Bulb size={20} color="green" />}
        {!playStatic && <Bulb size={20} color="black" />}
      </Box>
      <Container>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, md: 3 }}>
          {stations.map((station) => {
            return (
              <Grid item xs={12} md={4}>
                <StationCard
                  key={station.id}
                  callsign={station.call_sign}
                  image={station.image}
                  college={station.college_name}
                  audioURL={station.audio_url}
                  handleClick={handleClick}
                  stationObject={station}
                  playing={playing}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <audio
        className="staticAudio"
        loop
        src="https://www.soundjay.com/mechanical/sounds/tv-static-05.mp3"
      ></audio>
    </div>
  );
}

export default App;
